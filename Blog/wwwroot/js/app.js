var blogService = require('./blogService.js');
var serviceWorker = require('./swRegister.js');

//window events
let defferedPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    defferedPrompt = e;
    //atualizar a tela para notificar o usuario
    // que ele pode adicionar à tela de home
    $('#install-container').show();
});

window.addEventListener('appinstalled', (evt) => {
    console.log('app foi adicionada na home screen! Yuhuu!');
});

window.pageEvents = {
    addFavourite: function (id) {
        blogService.addFavourite(id);
    },
    loadBlogPost: function (link) {
        blogService.loadBlogPost(link);
    },
    loadFavouritePost: function () {
        blogService.loadFavouritePost();
    },
    loadMoreBlogPosts: function () {
        blogService.loadMoreBlogPosts();
    },
    ExitBlogPost: function () {
        blogService.ExitBlogPost();
    },
    tryAddHomeScreen: function () {
        defferedPrompt.prompt();
        defferedPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuário aceitou o A2HS prompt');
                $('#install-container').hide();
            }
            defferedPrompt = null;
        });
    },
    setBackgroundFetch: function (link) {
        navigator.serviceWorker.ready.then(async (swReg) => {
            const bgFetch = await swReg.backgroundFetch.fetch(link,
                ['/Home/Post/?link=' + link], {
                title: link,
                icons: [{
                    sizes: '192x192',
                    src: '/images/icons/icon-192x192.png',
                    type: 'image/png',
                }],
                downloadTotal: 15000,
            });

            bgFetch.addEventListener('progress', () => {
                if (!bgFetch.downloadTotal) return;

                const percent = Math.round(bgFetch.downloaded / bgFetch.downloadTotal * 100);
                console.log('Download progress: ' + percent + '%');
                console.log('Download status: ' + bgFetch.result);

                $('.download-start').hide();
                $('#status-download').show();
                $('#status-download > .progress > .progress-bar').css('width', percent + '%');

                if (bgFetch.result === 'success') {

                    $('#status-download > .text-success').show();
                }
            });
        });
    }
};

if ($("#blog-title").html()) {
    $('#verMais').hide();
    //$('#menuHome').addClass('menuAtivo');
    //$('#menuFavorito').addClass('menuInativo');
    $('#menuHome').css("color", '#46bfa9');
    blogService.loadLatestBlogPosts();
}
else {
    $('#verMais').hide();
    //$('#menuHome').addClass('menuInativo');
    //$('#menuFavorito').addClass('menuAtivo');
    $('#menuFavorito').css("color", '#46bfa9');
    blogService.loadFavouritePost();
}

$(document).ready(function () {
    $(this).scrollTop(0);
});

$(window).scroll(function () {
    var calc = parseFloat($(document).height() - $(window).height());
    var scrollTop = parseFloat($(window).scrollTop());
    var dif = scrollTop / calc;
    var ultimoscroll = JSON.parse(localStorage.getItem('ultimoscroll'));
    var executado = JSON.parse(localStorage.getItem('executado'));

    if (!executado) {
        executado = 'n';
    }

    if (!ultimoscroll) {
        ultimoscroll = dif;
    }


    //console.log(scrollTop + ' ===  ' + $(document).height() + ' - ' + $(window).height() + '(' + calc + ' | dif ' + dif + ')');
    // blogService.loadMoreBlogPosts();
    //if (scrollTop === calc) {
    alert(dif);
    if (dif >= 0.96) {
        if (executado === 'n' && dif > ultimoscroll) {
            localStorage.setItem('executado', JSON.stringify('s'));
            //this.alert("aaaa");
            blogService.loadMoreBlogPosts();
        }
        else {
            localStorage.setItem('executado', JSON.stringify('n'));
        }
    }
    localStorage.setItem('ultimoscroll', JSON.stringify(dif));
});

//$(window).scroll(function () {
//   // this.alert("aaaa");
//    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
//        $(window).disablescroll();
//        //blogService.loadMoreBlogPosts();
//        this.alert("aaaa");
//        //$(window).disablescroll("undo");
//    }
//});

