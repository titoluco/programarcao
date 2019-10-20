define(['./template.js', '../lib/showdown/showdown.js', './clientStorage.js'], function (template, showdown, clientStorage) {

    var blogLatestPostsUrl = '/Home/LatestBlogPosts/';
    var blogPostUrl = '/Home/Post/?link=';
    var blogMorePostsUrl = '/Home/MoreBlogPosts/?oldestBlogPostId=';
    var AlterFavouriteUrl = '/Home/AlterFavourite/?PostId=';
    var FavouritePostsUrl = '/Home/FavouritesBlogPosts/';

    function fetchPromise(url, link, text) {

        link = link || '';

        return new Promise(function (resolve, reject) {
            fetch(url + link)
                .then(function (data) {

                    var resolveSuccess = function () {
                        resolve('The connection is OK, showing latest results');
                    };

                    if (text) {
                        data.text().then(function (text) {
                            clientStorage.addPostText(link, text).then(resolveSuccess);
                        });
                    }
                    else {
                        data.json().then(function (jsonData) {
                            clientStorage.addPosts(jsonData).then(resolveSuccess);
                        });
                    }

                }).catch(function (e) {
                    resolve('No connection, showing offline results');
                });

            setTimeout(function () { resolve('The connection is hanging, showing offline results'); }, 5000);
        });
    }

    function loadData(url) {
        fetchPromise(url)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getPosts()
                    .then(function (posts) {
                        template.appendBlogList(posts);
                    });
            });
    }
    function loadFavourite(url) {
        fetchPromise(url)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getFavouritePosts()
                    .then(function (posts) {
                        //    template.appendBlogList(posts);
                        //});
                        if (posts.length > 0) {
                            template.appendBlogList(posts);
                        } else {
                            $('#connection-status').html("Sem favoritos");
                        }
                    }).catch(function (e) {
                        $('#connection-status').html(e);
                    });
            });
    }

    function loadLatestBlogPosts() {
        loadData(blogLatestPostsUrl);
    }

    function loadBlogPost(link) {

        fetchPromise(blogPostUrl, link, true)
            .then(function (status) {
                $('#connection-status').html(status);

                clientStorage.getPostText(link)
                    .then(function (data) {
                        if (!data) {
                            template.showBlogItem($('#blog-content-not-found').html(), link);
                        } else {
                            var converter = new showdown.Converter();
                            html = converter.makeHtml(data);
                            template.showBlogItem(html, link);
                        }
                        window.location = '#' + link;
                    })
            });
    }

    function addFavourite(id) {

        fetchPromise(AlterFavouriteUrl, id, true)
            .then(function (status) {
                var objId = "#fav" + id;
                var css = $(objId).attr("class").replace('fa fa-star ', '');
                if (css === "favorito") {
                    $(objId).addClass("adicionado");
                    $("#bodyModal").html("<p>add favorito</p>");
                    $("#modalAlert").modal("show");
                }
                else {
                    $(objId).removeClass("adicionado");
                    $("#bodyModal").html("<p>remove favorito</p>");
                    $("#modalAlert").modal("show");
                }
                

                //clientStorage.getPostText(link)
                //    .then(function (data) {
                //        if (!data) {
                //            template.showBlogItem($('#blog-content-not-found').html(), link);
                //        } else {
                //            var converter = new showdown.Converter();
                //            html = converter.makeHtml(data);
                //            template.showBlogItem(html, link);
                //        }
                //        window.location = '#' + link;
                //    })
            });
    }

    function ExitBlogPost() {          
        template.hidenBlogItem();
    }

    function loadMoreBlogPosts() {
        loadData(blogMorePostsUrl + clientStorage.getOldestBlogPostId());
    }
    function loadFavouritePost() {
        loadFavourite(FavouritePostsUrl);
    }

    return {
        loadLatestBlogPosts: loadLatestBlogPosts,
        loadBlogPost: loadBlogPost,
        loadFavouritePost: loadFavouritePost,
        loadMoreBlogPosts: loadMoreBlogPosts,
        ExitBlogPost: ExitBlogPost,
        addFavourite: addFavourite
    };
});