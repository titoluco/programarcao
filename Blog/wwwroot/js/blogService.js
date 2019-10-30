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
                        resolve('Conexão OK, exibindo dados atuais');
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
                    resolve('Sem conexão, exibindo posts offline');
                });

            setTimeout(function () { resolve('Conexão instável, exibindo posts offline'); }, 1000);
        });
    }

    function loadData(url) {
        fetchPromise(url)
            .then(function (status) {
                //$('#connection-status').html(status);
                $('#connection-status').removeClass('alert alert-info show');

                if (status.indexOf('Conexão OK') !== -1) {
                    mostraDialogo(status, 'success', 5000);
                }
                else if (status.indexOf('Sem conexão') !== -1) {
                    mostraDialogo(status, 'danger', 10000);
                }
                else {
                    mostraDialogo(status, 'warning', 5000);
                }

                clientStorage.getPosts()
                    .then(function (posts) {
                        template.appendBlogList(posts);
                        marcarFavoritos(posts);
                        controleExibicao('Index');
                    });
            });
    }
    function loadFavourite(url) {
        fetchPromise(url)
            .then(function (status) {
                //$('#connection-status').html(status);
                $('#connection-status').removeClass('alert alert-info show');
                mostraDialogo(status, 'success', 5000);

                clientStorage.getFavouritePosts()
                    .then(function (posts) {
                        //    template.appendBlogList(posts);
                        //});
                        if (posts.length > 0) {
                            template.appendBlogList(posts);
                            marcarFavoritos(posts);
                        } else {
                            //$('#connection-status').html("Sem favoritos");
                            mostraDialogo('Não há favoritos para exibir', 'info', 5000);
                        }
                    }).catch(function (e) {
                        $('#connection-status').html(e);
                        $('#connection-status').addClass('alert alert-info show');
                    });
            });
    }

    function loadLatestBlogPosts() {
        loadData(blogLatestPostsUrl);
    }
    
    function loadBlogPost(link) {

        fetchPromise(blogPostUrl, link, true)
            .then(function (status) {
                //$('#connection-status').html(status);
                //$('#connection-status').removeClass('alert alert-info show');
                //mostraDialogo(status, 'success', 5000);

                clientStorage.getPostText(link)
                    .then(function (data) {
                        if (!data) {
                            template.showBlogItemNotFound(link);
                            //$("#modalDialog").modal("show");
                            controleExibicao('Indisponivel');
                        } else {
                            var converter = new showdown.Converter();
                            html = converter.makeHtml(data);
                            template.showBlogItem(html, link);                            
                            //$("#modalAlert").modal("show");
                            controleExibicao('Artigo');
                        }
                        //window.location = '#' + link;
                    }).catch(function (e) {
                        mostraDialogo(e, 'danger', 10000);
                    });
            });
    }

    //function loadBlogPost2(link) {

    //    fetchPromise(blogPostUrl, link, true)
    //        .then(function (status) {
    //            //$('#connection-status').html(status);
    //            $('#connection-status').removeClass('alert alert-info show');
    //            mostraDialogo(status, 'success', 5000);

    //            clientStorage.getPostText(link)
    //                .then(function (data) {
    //                    if (!data) {
    //                        var contentNotFound = $('#blog-content-not-found').html().replace(/{{Link}}/g, link);
    //                        template.showBlogItem(contentNotFound, link);
    //                        $("#modalDialog").modal("show");
    //                    } else {
    //                        var converter = new showdown.Converter();
    //                        html = converter.makeHtml(data);
    //                        template.showBlogItem(html, link);
    //                        $("#modalAlert").modal("show");
    //                    }
    //                    //window.location = '#' + link;
    //                });
    //        });
    //}

    function addFavourite(id) {

        fetchPromise(AlterFavouriteUrl, id, true)
            .then(function (status) {
                var objId = "#fav" + id;
                //var css = $(objId).attr("class").replace('fa fa-star ', '');

                var listaFavoritos = JSON.parse(localStorage.getItem('favoritos'));

                if (!listaFavoritos) {
                    listaFavoritos = [];
                }

                if (listaFavoritos.includes(id)) {
                    $(objId).removeClass("adicionado");
                    listaFavoritos = listaFavoritos.filter(function (value, index, arr) { return value !== id; });
                    mostraDialogo('Post removido aos favoritos', 'warning', 5000);
                }
                else {
                    $(objId).addClass("adicionado");
                    listaFavoritos.push(id);
                    mostraDialogo('Post adicionado aos favoritos', 'success', 5000);
                }

                localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));               
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
    function marcarFavoritos(posts) {
        var listaFavoritos = JSON.parse(localStorage.getItem('favoritos'));

        if (!listaFavoritos) {
            listaFavoritos = [];
        }

        for (i = 0; i < posts.length; i++) {
            var objId = "#fav" + posts[i].postId.toString();
            if (listaFavoritos.includes(posts[i].postId.toString())) {
                $(objId).addClass("adicionado");
            }
            else {
                $(objId).removeClass("adicionado");
            }
        }
        //console.log(listaFavoritos);
    }

    function controleExibicao(item) {
        $('#abaIndex').hide();
        $('#abaFavorito').hide();
        $('#artigo').hide();
        $('#artigoNaoEncontrado').hide();

        switch (item) {
            case 'Favorito':
                $('#abaFavorito').show();
                break;
            case 'Artigo':
                $('#artigo').show();
                break;
            case 'Indisponivel':
                $('#artigoNaoEncontrado').show();
                break;
            default:
                $('#abaIndex').show();                
        }
    }

    return {
        loadLatestBlogPosts: loadLatestBlogPosts,
        loadBlogPost: loadBlogPost,
        loadFavouritePost: loadFavouritePost,
        loadMoreBlogPosts: loadMoreBlogPosts,
        ExitBlogPost: ExitBlogPost,
        addFavourite: addFavourite,
        controleExibicao: controleExibicao
    };
});