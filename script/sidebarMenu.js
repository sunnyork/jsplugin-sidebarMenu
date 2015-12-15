$( document ).ready(function() {

    var header_id = $("#header_id").attr("data-attr");
    var trigger = $('.books_nav');
    if(header_id != 'home'){
        $("#home_menu_list").hide();
        $("#home,#home_menu_list,#flagship_menu_list").mouseenter(function(e){
            clearTimeout($(trigger).data('close_pop'));
                $(trigger).data('open_pop',setTimeout(function(){
                $('#home_menu_list').show();
                if(!$('#flagship').hasClass('here')){
                    $('#home').addClass('here');
                }else{
                    $('#flagship').addClass('here');
                }
            },100));
        });
        $(".books_nav").mouseleave(function(e){
            clearTimeout($(trigger).data('open_pop'));
            $(trigger).data('close_pop',setTimeout(function(){
                $('#home').removeClass('here');
                $('#flagship').removeClass('here');
                $('#home_menu_list').hide();
                $('#flagship_menu_list').hide();
                $('.type04_header .books_nav .menu li').find('.nav_popup').hide();
            },500));
        });
    }


    //全站分類
    $(".type04_header .books_nav .menu:not(.style03) li").hover(function(){
        var adv_id = $(this).find(".box_ban").attr("data-adv");
        var source = $(this).find(".box_ban").attr("data-source");
        if(adv_id != 0){
            adv_set(adv_id, source,"V");
        }

        /*dav*/
        var list = $(this),
            list_top = $(list).offset().top,
            first_item_top = $('div.books_nav div.nav_box:not(:hidden) li:eq(0)').offset().top,
            scroll_top = $(window).scrollTop(),
            cart_height = $('.header_box1 ul:first').height();
            show_lag = 200,
            fadeOut_time = 300,
            scroll_fix = (scroll_top > first_item_top)?
                (scroll_fix = -1* list_top + scroll_top+cart_height):(scroll_fix = -1* list_top + first_item_top);
        clearTimeout($(list).data('close_pop'));
        $(list)
            .data('open_pop',setTimeout(function(){
                var is_load = $(list).attr('is_load'),
                    now_tab = $('.books_nav .tabs .here'),
                    tab_order = $(now_tab).parent().children('li').index(now_tab),//所在tab(全站分類or旗艦店)
                    list_order = $(list).parent().children('li').index($(list)); //所在選單項目的index;
                if(!is_load){//未載入過選單的情況
                    HgenDOM({//產生選單內容並塞入pop框
                        tab:tab_order,
                        idx:list_order,
                        box:list
                    }).init();
                    $(list).attr('is_load','1');
                }
                var pop_menu = $(list).find('.nav_popup');
                $(pop_menu)
                    .show()
                    .css('top',function(){
                        if(-1*scroll_fix > $(pop_menu).height()){//修正(過短的選單)彈出位置
                            scroll_fix -= scroll_fix + $(pop_menu).height() - $(list).height();
                        }
                        return scroll_fix;
                    });
                $(list)
                    .addClass('here')
                    .siblings().removeClass('here').find('.nav_popup').fadeOut(fadeOut_time);
            },show_lag));
        /*end dav*/

    },function(){

        /*dav*/
        var list = $(this),
        hide_lag = 400,
        fadeOut_time = 300;
        clearTimeout($(list).data('open_pop'));
        $(list)
        .data('close_pop',setTimeout(function(){
                $(list)
                    .removeClass('here')
                    .children('div').fadeOut(fadeOut_time);
            },hide_lag)
        );
        /*end dav*/
    });



});

/**
 * 全站分類生DOM
 */
function HgenDOM(c){
    var tab = c.tab,
        idx = c.idx,
        box = c.box,
        src = HmenuSource;
    return {
        init: function(){
            var obj = this,
                pop = src[tab][idx];
            obj.createEl(pop,box);
        },
        createEl:function(arr,box){
            /*
            * @param o {arr} child list(DOM setting)
            * @param b {HTML object} container to be appendTo
            *
            * @config DOM setting
            * {
            *   n: {str} HTML tag name
            *   t: {str} text inside the element
            *   s: {arr} class(s)
            *   a: {obj} attributes including ID
            *   c: {arr} child element(s)
            * }
            *
            * */
            var obj = this,
                box = box;
            for(var i=0;i<arr.length;i++){
                if(!arr[i]){continue;}
                if(typeof arr[i].n !='string'){continue;}
                var o = arr[i],
                    el = document.createElement(o.n),
                    txt = o.t,
                    hook = o.s,
                    attr = o.a,
                    kids = o.c;
                $(el).text(txt);
                if(hook) {$(el).addClass(hook.join(' '));}
                if(attr) {$(el).attr(attr);}
                if(kids) {obj.createEl(kids,el);}
                $(el).appendTo(box);
            }
        }
    }
}


/**
 * 切換全站分類、旗鑑店
 * @param {string} flag
 */
function Hmenu(flag){
    if(flag == 'flagship'){
        $('#home').attr("class" , "first");
        $('#flagship').attr("class" , "last here");
        $('#flagship_menu_list').show();
        $('#home_menu_list').hide();
    }else{
        $('#home').attr("class" , "first here");
        $('#flagship').attr("class" , "last");
        $('#flagship_menu_list').hide();
        $('#home_menu_list').show();
    }
}

