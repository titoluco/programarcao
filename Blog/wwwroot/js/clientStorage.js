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
                debugger;
                var index = keys.indexOf(oldestBlogPostId);
                if (index === -1) { index = keys.length; }
                if (index === 0) { resolve([]); return; }

                var start = index - limit;
                var limitAdjusted = start < 0 ? index : limit;

                keys = keys.splice(Math.max(0, start), limitAdjusted);

                blogInstance.getItems(keys).then(function (results) {
                    var posts = Object.keys(results).map(function (k) { return results[k] }).reverse();
                    oldestBlogPostId = String(posts[posts.length - 1].postId);
                    resolve(posts);
                });
            });

        });
    }

    //function getPosts() {

    //    return new Promise(function (resolve, reject) {
    //        blogInstance.keys().then(function (keys) {

    //            keys = keys.filter(function (a) { return a && !a.includes('#'); });
    //            keys = keys.sort(function (a, b) { return a - b; });

    //            var index2 = keys.indexOf(oldestBlogPostId);
    //            if (index2 === -1) { index2 = keys.length; }
    //            if (index2 === 0) { resolve([]); return; }

    //            var start2 = index2 - limit;
    //            var limitAdjusted2 = start2 < 0 ? index2 : limit;

    //            var index = keys.length;

    //            var start = index - limit;
    //            var limitAdjusted = oldestBlogPostId - limit;

    //            keys = keys.splice(Math.max(0, start), limitAdjusted);

    //            blogInstance.getItems(keys).then(function (results) {
    //                var posts = Object.keys(results).map(function (k) { return results[k] }).reverse();
    //                oldestBlogPostId = String(posts[posts.length - 1].postId);
    //                resolve(posts);
    //            });
    //        });

    //    });
    //}
    /*
    function getFavouritePosts() {

        return new Promise(function (resolve, reject) {
            blogInstance.keys().then(function (keys) {

                keys = keys.filter(function (a) { return a && !a.includes('#'); });
                keys = keys.sort(function (a, b) { return a - b; });

                var index = keys.indexOf(oldestBlogPostId);
                if (index === -1) { index = keys.length; }
                if (index === 0) { resolve([]); return; }

                var start = index - limit;
                var limitAdjusted = start < 0 ? index : limit;

                keys = keys.splice(Math.max(0, start), limitAdjusted);

                blogInstance.getItems().then(function (results) {
                    var posts = Object.keys(results).map(function (k) { return results[k]; }).reverse();
                    posts = posts.filter(function (x) { return x.favorito === 'favorito adicionado'; });
                    //oldestBlogPostId = posts.length === 0 ? undefined : String(posts[posts.length - 1].postId);
                    resolve(posts);
                });
            });

        });

    }
    */
    function getFavouritePosts() {

        return new Promise(function (resolve, reject) {
            blogInstance.keys().then(function (keys) {

                keys = keys.filter(function (a) { return a && !a.includes('#'); });
                keys = keys.sort(function (a, b) { return a - b; });

                var index = keys.indexOf(oldestBlogPostId);
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
                    oldestBlogPostId = posts.length === 0 ? undefined : String(posts[posts.length - 1].postId);
                    resolve(posts);
                });
            });

        });

    }

    function getOldestBlogPostId() {
        return oldestBlogPostId;
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