"use strict";
importScripts('lib/localforage/localforage.min.js');

var cacheName = 'v21Cache';


//var blogCacheFiles = [
//    '/',
//    '/home/index',
//    '/home/favourite',
//    //arquivos basicos da pwa
//    '/sw.js',
//    '/lib/bootstrap/dist/css/bootstrap.css',
//    '/css/site.css',
//    '/lib/jquery/dist/jquery.js',
//    '/lib/bootstrap/dist/js/bootstrap.min.js',
//    '/lib/es6-promise/es6-promise.js',
//    '/lib/fetch/fetch.js',
//    '/lib/systemjs/system.js',
//    '/lib/localforage/localforage.min.js',
//    '/lib/localforage/localforage-getitems.js',
//    '/lib/localforage/localforage-setitems.js',
//    '/js/site.js',
//    '/js/app.js',
//    '/manifest.json',
//    '/favicon.ico',
//    '/js/blogService.js',
//    '/js/swRegister.js',
//    '/js/template.js',
//    '/lib/showdown/showdown.js',
//    '/js/clientStorage.js',
//    '/images/icons/icon-72x72.png',
//    '/images/icons/icon-96x96.png',
//    '/images/icons/icon-128x128.png',
//    '/images/icons/icon-144x144.png',
//    '/images/icons/icon-152x152.png',
//    '/images/icons/icon-192x192.png',
//    '/images/icons/icon-384x384.png',
//    '/images/icons/icon-512x512.png',

//    '/css2/animate.min.css',
//    '/css2/bootstrap.css',
//    '/css2/font-awesome.css',
//    '/css2/owl.carousel.css',
//    '/css2/pe-icon-7-stroke.css',
//    '/css2/prettyPhoto.css',
//    '/css2/style.css',

//    '/js2/vendor/bootstrap.js',
//    '/js2/vendor/bootstrap.min.js',
//    '/js2/vendor/html5shiv.js',
//    '/js2/vendor/jquery-1.11.2.min.js',
//    '/js2/vendor/npm.js'
//];
var blogCacheFiles = [
    '/',
    '/home/index',
    '/home/favourite',
    //arquivos basicos da pwa
    '/sw.js',
    '/lib/bootstrap/dist/css/bootstrap.css',
    '/css/site.css',
    '/lib/jquery/dist/jquery.js',
    '/lib/bootstrap/dist/js/bootstrap.min.js',
    '/lib/es6-promise/es6-promise.js',
    '/lib/fetch/fetch.js',
    '/lib/systemjs/system.js',
    '/lib/localforage/localforage.min.js',
    '/lib/localforage/localforage-getitems.js',
    '/lib/localforage/localforage-setitems.js',
    '/js/site.js',
    '/js/app.js',
    '/manifest.json',
    '/favicon.ico',
    '/js/blogService.js',
    '/js/swRegister.js',
    '/js/template.js',
    '/lib/showdown/showdown.js',
    '/js/clientStorage.js',

    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png',
    '/images/icons/touch-icon-ipad.png',
    '/images/icons/touch-icon-iphone.png',
    '/images2/blog/1.png',
    '/images2/blog/10.png',
    '/images2/blog/11.png',
    '/images2/blog/12.png',
    '/images2/blog/2.png',
    '/images2/blog/3.png',
    '/images2/blog/4.png',
    '/images2/blog/5.png',
    '/images2/blog/6.png',
    '/images2/blog/7.png',
    '/images2/blog/8.png',
    '/images2/blog/9.png',
    '/images2/client/1.png',
    '/images2/client/2.png',
    '/images2/client/3.png',
    '/images2/client/4.png',
    '/images2/favicon/favicon.png',
    '/images2/favicon/favicon_.png',
    '/images2/portfolio/1.jpg',
    '/images2/portfolio/2.jpg',
    '/images2/portfolio/3.jpg',
    '/images2/portfolio/4.jpg',
    '/images2/portfolio/5.jpg',
    '/images2/portfolio/6.jpg',
    '/images2/portfolio/7.jpg',
    '/images2/portfolio/8.jpg',
    '/images2/slider/1.jpg',
    '/images2/slider/2.jpg',
    '/images2/slider/3.jpg',
    '/images2/team/1.jpg',
    '/images2/team/2.jpg',
    '/images2/team/3.jpg',
    '/images2/team/4.jpg',
    '/images2/work/1.jpg',
    '/images2/work/2.jpg',
    '/images2/work/3.jpg',
    '/images2/prettyPhoto/dark_rounded/btnNext.png',
    '/images2/prettyPhoto/dark_rounded/btnPrevious.png',
    '/images2/prettyPhoto/dark_rounded/contentPattern.png',
    '/images2/prettyPhoto/dark_rounded/default_thumbnail.gif',
    '/images2/prettyPhoto/dark_rounded/loader.gif',
    '/images2/prettyPhoto/dark_rounded/sprite.png',
    '/images2/prettyPhoto/dark_square/btnNext.png',
    '/images2/prettyPhoto/dark_square/btnPrevious.png',
    '/images2/prettyPhoto/dark_square/contentPattern.png',
    '/images2/prettyPhoto/dark_square/default_thumbnail.gif',
    '/images2/prettyPhoto/dark_square/loader.gif',
    '/images2/prettyPhoto/dark_square/sprite.png',
    '/images2/prettyPhoto/default/default_thumb.png',
    '/images2/prettyPhoto/default/loader.gif',
    '/images2/prettyPhoto/default/sprite.png',
    '/images2/prettyPhoto/default/sprite_next.png',
    '/images2/prettyPhoto/default/sprite_prev.png',
    '/images2/prettyPhoto/default/sprite_x.png',
    '/images2/prettyPhoto/default/sprite_y.png',
    '/images2/prettyPhoto/facebook/btnNext.png',
    '/images2/prettyPhoto/facebook/btnPrevious.png',
    '/images2/prettyPhoto/facebook/contentPatternBottom.png',
    '/images2/prettyPhoto/facebook/contentPatternLeft.png',
    '/images2/prettyPhoto/facebook/contentPatternRight.png',
    '/images2/prettyPhoto/facebook/contentPatternTop.png',
    '/images2/prettyPhoto/facebook/default_thumbnail.gif',
    '/images2/prettyPhoto/facebook/loader.gif',
    '/images2/prettyPhoto/facebook/sprite.png',
    '/images2/prettyPhoto/light_rounded/btnNext.png',
    '/images2/prettyPhoto/light_rounded/btnPrevious.png',
    '/images2/prettyPhoto/light_rounded/default_thumbnail.gif',
    '/images2/prettyPhoto/light_rounded/loader.gif',
    '/images2/prettyPhoto/light_rounded/sprite.png',
    '/images2/prettyPhoto/light_square/btnNext.png',
    '/images2/prettyPhoto/light_square/btnPrevious.png',
    '/images2/prettyPhoto/light_square/default_thumbnail.gif',
    '/images2/prettyPhoto/light_square/loader.gif',
    '/images2/prettyPhoto/light_square/sprite.png',


    '/css2/animate.min.css',
    '/css2/bootstrap.css',
    '/css2/font-awesome.css',
    '/css2/owl.carousel.css',
    '/css2/pe-icon-7-stroke.css',
    '/css2/prettyPhoto.css',
    '/css2/style.css',

    '/js2/vendor/bootstrap.js',
    '/js2/vendor/bootstrap.min.js',
    '/js2/vendor/html5shiv.js',
    '/js2/vendor/jquery-1.11.2.min.js',
    '/js2/vendor/npm.js'
];
/*

var blogCacheFiles = [
    '/',
    //arquivos basicos da pwa
    '/sw.js',
    '/favicon.ico',
    '/manifest.json',
    '/css/custom.css',
    '/css/site.css',
    '/css/site.min.css',
    '/css2/animate.min.css',
    '/css2/bootstrap.css',
    '/css2/font-awesome.css',
    '/css2/owl.carousel.css',
    '/css2/pe-icon-7-stroke.css',
    '/css2/prettyPhoto.css',
    '/css2/style.css',
    '/fonts/fontawesome-webfont.eot',
    '/fonts/fontawesome-webfont.svg',
    '/fonts/fontawesome-webfont.ttf',
    '/fonts/fontawesome-webfont.woff',
    '/fonts/fontawesome-webfont.woff2',
    '/fonts/FontAwesome.otf',
    '/fonts/glyphicons-halflings-regular.eot',
    '/fonts/glyphicons-halflings-regular.svg',
    '/fonts/glyphicons-halflings-regular.ttf',
    '/fonts/glyphicons-halflings-regular.woff',
    '/fonts/Pe-icon-7-stroke.eot',
    '/fonts/Pe-icon-7-stroke.svg',
    '/fonts/Pe-icon-7-stroke.ttf',
    '/fonts/Pe-icon-7-stroke.woff',
    '/js/app.js',
    '/js/blogService.js',
    '/js/clientStorage.js',
    '/js/disablescroll.js',
    '/js/notification.js',
    '/js/site.js',
    '/js/site.min.js',
    '/js/swRegister.js',
    '/js/template.js',
    '/images/icons/icon-128x128.png',
    '/images/icons/icon-144x144.png',
    '/images/icons/icon-152x152.png',
    '/images/icons/icon-192x192.png',
    '/images/icons/icon-384x384.png',
    '/images/icons/icon-512x512.png',
    '/images/icons/icon-72x72.png',
    '/images/icons/icon-96x96.png',
    '/images/icons/touch-icon-ipad.png',
    '/images/icons/touch-icon-iphone.png',
    '/images2/blog/1.png',
    '/images2/blog/10.png',
    '/images2/blog/11.png',
    '/images2/blog/12.png',
    '/images2/blog/2.png',
    '/images2/blog/3.png',
    '/images2/blog/4.png',
    '/images2/blog/5.png',
    '/images2/blog/6.png',
    '/images2/blog/7.png',
    '/images2/blog/8.png',
    '/images2/blog/9.png',
    '/images2/client/1.png',
    '/images2/client/2.png',
    '/images2/client/3.png',
    '/images2/client/4.png',
    '/images2/favicon/favicon.png',
    '/images2/favicon/favicon_.png',
    '/images2/portfolio/1.jpg',
    '/images2/portfolio/2.jpg',
    '/images2/portfolio/3.jpg',
    '/images2/portfolio/4.jpg',
    '/images2/portfolio/5.jpg',
    '/images2/portfolio/6.jpg',
    '/images2/portfolio/7.jpg',
    '/images2/portfolio/8.jpg',
    '/images2/slider/1.jpg',
    '/images2/slider/2.jpg',
    '/images2/slider/3.jpg',
    '/images2/team/1.jpg',
    '/images2/team/2.jpg',
    '/images2/team/3.jpg',
    '/images2/team/4.jpg',
    '/images2/work/1.jpg',
    '/images2/work/2.jpg',
    '/images2/work/3.jpg',
    '/js2/vendor/bootstrap.js',
    '/js2/vendor/bootstrap.min.js',
    '/js2/vendor/html5shiv.js',
    '/js2/vendor/jquery-1.11.2.min.js',
    '/js2/vendor/npm.js',
    '/lib/es6-promise/es6-promise.js',
    '/lib/es6-promise/es6-promise.map',
    '/lib/fetch/fetch.js',
    '/lib/jquery-validation-unobtrusive/.bower.json',
    '/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.js',
    '/lib/jquery-validation-unobtrusive/jquery.validate.unobtrusive.min.js',
    '/lib/jquery-validation-unobtrusive/LICENSE.txt',
    '/lib/localforage/localforage-getitems.js',
    '/lib/localforage/localforage-setitems.js',
    '/lib/localforage/localforage.min.js',
    '/lib/showdown/showdown.js',
    '/lib/showdown/showdown.js.map',
    '/lib/showdown/showdown.min.js',
    '/lib/showdown/showdown.min.js.map',
    '/lib/systemjs/system-polyfills.js',
    '/lib/systemjs/system-polyfills.js.map',
    '/lib/systemjs/system-polyfills.src.js',
    '/lib/systemjs/system.js',
    '/lib/systemjs/system.js.map',
    '/lib/systemjs/system.src.js',
    '/images2/prettyPhoto/dark_rounded/btnNext.png',
    '/images2/prettyPhoto/dark_rounded/btnPrevious.png',
    '/images2/prettyPhoto/dark_rounded/contentPattern.png',
    '/images2/prettyPhoto/dark_rounded/default_thumbnail.gif',
    '/images2/prettyPhoto/dark_rounded/loader.gif',
    '/images2/prettyPhoto/dark_rounded/sprite.png',
    '/images2/prettyPhoto/dark_square/btnNext.png',
    '/images2/prettyPhoto/dark_square/btnPrevious.png',
    '/images2/prettyPhoto/dark_square/contentPattern.png',
    '/images2/prettyPhoto/dark_square/default_thumbnail.gif',
    '/images2/prettyPhoto/dark_square/loader.gif',
    '/images2/prettyPhoto/dark_square/sprite.png',
    '/images2/prettyPhoto/default/default_thumb.png',
    '/images2/prettyPhoto/default/loader.gif',
    '/images2/prettyPhoto/default/sprite.png',
    '/images2/prettyPhoto/default/sprite_next.png',
    '/images2/prettyPhoto/default/sprite_prev.png',
    '/images2/prettyPhoto/default/sprite_x.png',
    '/images2/prettyPhoto/default/sprite_y.png',
    '/images2/prettyPhoto/facebook/btnNext.png',
    '/images2/prettyPhoto/facebook/btnPrevious.png',
    '/images2/prettyPhoto/facebook/contentPatternBottom.png',
    '/images2/prettyPhoto/facebook/contentPatternLeft.png',
    '/images2/prettyPhoto/facebook/contentPatternRight.png',
    '/images2/prettyPhoto/facebook/contentPatternTop.png',
    '/images2/prettyPhoto/facebook/default_thumbnail.gif',
    '/images2/prettyPhoto/facebook/loader.gif',
    '/images2/prettyPhoto/facebook/sprite.png',
    '/images2/prettyPhoto/light_rounded/btnNext.png',
    '/images2/prettyPhoto/light_rounded/btnPrevious.png',
    '/images2/prettyPhoto/light_rounded/default_thumbnail.gif',
    '/images2/prettyPhoto/light_rounded/loader.gif',
    '/images2/prettyPhoto/light_rounded/sprite.png',
    '/images2/prettyPhoto/light_square/btnNext.png',
    '/images2/prettyPhoto/light_square/btnPrevious.png',
    '/images2/prettyPhoto/light_square/default_thumbnail.gif',
    '/images2/prettyPhoto/light_square/loader.gif',
    '/images2/prettyPhoto/light_square/sprite.png',
    '/lib/jquery/dist/jquery.js',
    '/lib/jquery/dist/jquery.min.js',
    '/lib/jquery/dist/jquery.min.map',
    '/lib/jquery-validation/dist/additional-methods.js',
    '/lib/jquery-validation/dist/additional-methods.min.js',
    '/lib/jquery-validation/dist/jquery.validate.js',
    '/lib/jquery-validation/dist/jquery.validate.min.js',
    '/lib/bootstrap/dist/css/bootstrap-grid.css',
    '/lib/bootstrap/dist/css/bootstrap-grid.css.map',
    '/lib/bootstrap/dist/css/bootstrap-grid.min.css',
    '/lib/bootstrap/dist/css/bootstrap-grid.min.css.map',
    '/lib/bootstrap/dist/css/bootstrap-reboot.css',
    '/lib/bootstrap/dist/css/bootstrap-reboot.css.map',
    '/lib/bootstrap/dist/css/bootstrap-reboot.min.css',
    '/lib/bootstrap/dist/css/bootstrap-reboot.min.css.map',
    '/lib/bootstrap/dist/css/bootstrap-theme.css',
    '/lib/bootstrap/dist/css/bootstrap-theme.css.map',
    '/lib/bootstrap/dist/css/bootstrap-theme.min.css',
    '/lib/bootstrap/dist/css/bootstrap-theme.min.css.map',
    '/lib/bootstrap/dist/css/bootstrap.css',
    '/lib/bootstrap/dist/css/bootstrap.css.map',
    '/lib/bootstrap/dist/css/bootstrap.min.css',
    '/lib/bootstrap/dist/css/bootstrap.min.css.map',
    '/lib/bootstrap/dist/fonts/glyphicons-halflings-regular.eot',
    '/lib/bootstrap/dist/fonts/glyphicons-halflings-regular.svg',
    '/lib/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf',
    '/lib/bootstrap/dist/fonts/glyphicons-halflings-regular.woff',
    '/lib/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2',
    '/lib/bootstrap/dist/js/bootstrap.bundle.js',
    '/lib/bootstrap/dist/js/bootstrap.bundle.js.map',
    '/lib/bootstrap/dist/js/bootstrap.bundle.min.js',
    '/lib/bootstrap/dist/js/bootstrap.bundle.min.js.map',
    '/lib/bootstrap/dist/js/bootstrap.js',
    '/lib/bootstrap/dist/js/bootstrap.js.map',
    '/lib/bootstrap/dist/js/bootstrap.min.js',
    '/lib/bootstrap/dist/js/bootstrap.min.js.map',
    '/lib/bootstrap/dist/js/npm.js'
];
*/

function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            reject();
        }, ms)
        promise.then(resolve, reject)
    });
}

//Installing
//Pre-cache App Shell
self.addEventListener('install', function (event) {
    console.log("SW: Evento de Instalacao");
    self.skipWaiting();
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(blogCacheFiles)
            })
    );
});

//Activating
//Clean up
self.addEventListener('activate', function (event) {
    console.log("SW: Evento de Ativacao");
    self.clients.claim();
    event.waitUntil(
        caches.keys()
            .then(function (cacheKeys) {
                var deletePromises = [];
                for (var i = 0; i < cacheKeys.length; i++) {
                    if (cacheKeys[i] != cacheName) {
                        deletePromises.push(caches.delete(cacheKeys[i]));
                    }
                }
                return Promise.all(deletePromises);
            })
    );
});

self.addEventListener('fetch', event => {

    //console.log('url request: ' + event.request.url);

    if (event.request.url.toLowerCase().includes("/home")) {
        console.log('[ServiceWorker] online - get online ' + event.request.url);
        event.respondWith(fetch(event.request));
    } else {
        event.respondWith(
            timeout(1000, fetch(event.request)).catch(function () {
                console.log('[ServiceWorker] offline - get from cache: ' + event.request.url);
                return caches.match(event.request);
            })
        );
    }
});