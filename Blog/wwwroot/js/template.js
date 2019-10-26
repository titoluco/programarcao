define([], function () {

    function generateBlogItem(item) {
        var template = $('#blog-card').html();
        template = template.replace(/{{PostId}}/g, item.postId);
        template = template.replace(/{{Title}}/g, item.title);
        template = template.replace(/{{ShortDescription}}/g, item.shortDescription);
        template = template.replace(/{{Link}}/g, item.link);
        template = template.replace(/{{favorito}}/g, item.favorito);
        //template = template.replace('{{PostIdFavorito}}', item.postId);
        //template = template.replace('{{IdFavorito}}', item.postId);
        return template;
    }

    //function favorito(item) {

    //    var template = $('#blog-card').html();
    //    if (item === 'Adicionar') {
    //        template = template.replace('{{favorito}}', item.postId);
    //    }
    //    else {
    //        template = template.replace('{{favorito}}', item.postId);
    //    }
    //    return template;
    //}

    function appendBlogList(items) {
        var cardHtml = '';
        for (var i = 0; i < items.length; i++) {
            cardHtml += generateBlogItem(items[i]);
        }
        //$('.blog-list').html(cardHtml);
        //$('.blog-list').append(cardHtml);
        $('.bloglist').append(cardHtml);        
    }


    function showBlogItem(html, link) {
        var template = $('#blog-item').html();
        template = template.replace('{{Link}}', link);
        template = template.replace('{{Content}}', html);
        //$('#blog-item-container').html(template);
    }

    function hidenBlogItem() {        
        var template = $('#blog-item').html();
        $('#blog-item-container').html("");        
    }

    return {
        appendBlogList: appendBlogList,
        showBlogItem: showBlogItem,
        hidenBlogItem: hidenBlogItem
    };
});