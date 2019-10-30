define([], function () {

    var oldestBlogPostId = "";
    var limit = 3;
    var blogInstance = localforage.createInstance({
        name: 'blog'
    });

    function getPostText(link) {
        return new Promise(function (resolve, reject) {
            blogInstance.getItem('#' + link)
                .then(function (text) {
                    resolve(text);
                });
        });
    }

    function addPostText(link, text) {
        return new Promise(function (resolve, reject) {
            blogInstance.setItem('#' + link, text).then(function () {
                resolve();
            });
        });
    }

    function removePostText(link, text) {
        //return new Promise(function (resolve, reject) {
        //    blogInstance.removePostText('#' + link, text).then(function () {
        //        resolve();
        //    });
        //});
    }

    function addPosts(posts) {
        return new Promise(function (resolve, reject) {

            var keyValuePair = [];

            posts.map(function (item) {
                keyValuePair.push({ key: String(item.postId), value: item });
            })

            keyValuePair = keyValuePair.sort(function (a, b) { return b.key - a.key });

            blogInstance.setItems(keyValuePair)
                .then(function () {
                    resolve();
                });
        });
    }

    function getPosts() {

        return new Promise(function (resolve, reject) {
            blogInstance.keys().then(function (keys) {

                keys = keys.filter(function (a) { return a && !a.includes('#'); });
                keys = keys.sort(function (a, b) { return a - b; });
                
                oldestBlogPostId = getOldestBlogPostId();
                var index = keys.indexOf(oldestBlogPostId);
                if (index === -1) { index = keys.length; }
                if (index === 0) { resolve([]); return; }

                var start = index - limit;
                var limitAdjusted = start < 0 ? index : limit;

                keys = keys.splice(Math.max(0, start), limitAdjusted);

                blogInstance.getItems(keys).then(function (results) {
                    var posts = Object.keys(results).map(function (k) { return results[k] }).reverse();
                    oldestBlogPostId = String(posts[posts.length - 1].postId);
                    localStorage.setItem('oldestBlogPostId', JSON.stringify(oldestBlogPostId));               
                    resolve(posts);
                });
            });

        });
    }

    function getFavouritePosts() {

        return new Promise(function (resolve, reject) {
            blogInstance.keys().then(function (keys) {

                keys = keys.filter(function (a) { return a && !a.includes('#'); });
                keys = keys.sort(function (a, b) { return a - b; });

                var index = -1; //keys.indexOf(oldestBlogPostId);
                if (index === -1) { index = keys.length; }
                if (index === 0) { resolve([]); return; }

                var start = index - limit;
                var limitAdjusted = start < 0 ? index : limit;

                keys = keys.splice(Math.max(0, start), limitAdjusted);

                blogInstance.getItems().then(function (results) {
                    var posts = Object.keys(results).map(function (k) { return results[k]; }).reverse();
                    var listaFavoritos = JSON.parse(localStorage.getItem('favoritos'));

                    if (!listaFavoritos) {
                        resolve([]);
                    }
                    posts = posts.filter(function (x) { return x.postId ? listaFavoritos.includes(x.postId.toString()) : false; });
                    //oldestBlogPostId = posts.length === 0 ? undefined : String(posts[posts.length - 1].postId);
                    resolve(posts);
                });
            });

        });

    }

    function getOldestBlogPostId() {
        //return oldestBlogPostId;
        return JSON.parse(localStorage.getItem('oldestBlogPostId'));
    }

    return {
        addPosts: addPosts,
        getPosts: getPosts,
        getOldestBlogPostId: getOldestBlogPostId,
        addPostText: addPostText,
        getPostText: getPostText,
        getFavouritePosts: getFavouritePosts
    }
});