/**
 * Author: Vlad R.
 * Date: 17.10.13
 */

var contactUs_plugin = function(callback, $container, plugin_lang){
    var
        _plugin_lang = {
            support: "Support",
            contact_title: 'Having difficulties, have any questions?<br>Contact us below',
            name: 'Name',
            email: 'Email Address',
            topic: 'Topic',
            message: 'Message',
            send: 'Send',
            contact_error_caption: 'An error occurred'
        },
        _style_contactUs_plugin = {'font-family': '\'Segoe UI\',Helvetica,Arial,sans-serif'},
        _style_plugin_caption = {
            'cursor': 'pointer',
            'float': 'left',
            'position': 'relative',
            'left': '31px',
            'top': '40px',
            'color': '#ffffff',
            'background': '#28b578',
            'font-size': '18px',
            'font-weight': 'bold',
            'padding': '7px',
            'text-transform': 'uppercase'
        },
        _style_plugin_main = {
            'float': 'left',
            'font-size': '14px',
            'display': 'none',
            'width': '400px',
            'border': '#28b578 3px solid',
            'padding': '30px',
            'background': '#ededed',
            'line-height': '20px'
        },
        _style_plugin_title= {
            'font-size': '20px',
            'line-height': '28px'
        },
        _style_plugin_form= {
            'margin': '0'
        },
        _style_plugin_form_div= {
            'padding-top': '20px'
        },
        _style_plugin_input= {
            'padding': '6px',
            'border': '1px solid #E5E5E5',
            'font-family': '"Segoe UI","Helvetica Neue",Helvetica,Arial,sans-serif',
            'box-shadow': '0 1px 1px rgba(0, 0, 0, 0.075) inset',
            'transition': 'border 0.2s linear 0s, box-shadow 0.2s linear 0s',
            'border-radius': '0 0 0 0',
            'width': '100%'
        },
        _style_plugin_button = {
            'text-transform': 'uppercase',
            'margin-top': '20px',
            'background-color': '#3c9cc8',
            'color': '#ffffff',
            'background-image': 'none',
            'border': '0 none',
            'border-radius': '0 0 0 0 !important',
            'box-shadow': 'none',
            'filter': 'none',
            'font-size': '14px',
            'font-weight': 'bold',
            'outline': 'medium none',
            'padding': '7px 50px'
        },
        _style_plugin_error = {
            'display': 'none',
            'color': 'red'
        },

        _jlang = function(key){
            if(typeof plugin_lang !== "undefined")
                return plugin_lang[key];
            var value = '';
            if((typeof jlang === "function") && (value = jlang(key))!==key)
                return value;
            if((typeof lang === "object") && (typeof lang[key] !== "undefined"))
                return lang[key];
            return _plugin_lang[key];
        },

        $plugin = $('<div class=".contactUs_plugin">' +
            '<div class="plugin_caption">'+_jlang('support')+'</div>' +
            '<div class="plugin_main">' +
            '<div class="plugin_title">'+_jlang('contact_title')+'</div>' +
            '<form method="post">' +
            '<div>'+_jlang('name')+' <input name="name"></div>' +
            '<div>'+_jlang('email')+' <input name="email"></div>' +
            '<div>'+_jlang('topic')+' <input name="topic"></div>' +
            '<div>'+_jlang('message')+' <textarea name="message"></textarea></div>' +
            '<div class="error">'+_jlang('contact_error_caption')+'<span></span></div>' +
            '<button type="submit">'+_jlang('send')+'</button>' +
            '</form>' +
            '</div>' +
            '</div>'),

        $_plugins_list = [],

        rotate = function($el, degrees){
            var deg2radians = Math.PI * 2 / 360,
                rad = degrees * deg2radians,
                costheta = Math.cos(rad),
                sintheta = Math.sin(rad),
                a = parseFloat(costheta).toFixed(8),
                b = parseFloat(-sintheta).toFixed(8),
                c = parseFloat(sintheta).toFixed(8),
                d = parseFloat(costheta).toFixed(8),
                height = $el.css('height');

            $el.css( {
                '-ms-filter' : 'progid:DXImageTransform.Microsoft.Matrix(M11=' + a + ', M12=' + b + ', M21=' + c + ', M22=' + d + ',sizingMethod=\'auto expand\')',
                'filter' : 'progid:DXImageTransform.Microsoft.Matrix(M11=' + a + ', M12=' + b + ', M21=' + c + ', M22=' + d + ',sizingMethod=\'auto expand\')',
                '-moz-transform' : "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)",
                '-ms-transform' : "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)",
                '-webkit-transform' : "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)",
                '-o-transform' : "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)",
                'transform' : "matrix(" + a + ", " + c + ", " + b + ", " + d + ", 0, 0)"
            });

            // set margins to correct overflow
            // a / b = sin alpha / sin beta
            var margin = parseInt(((Math.sin(degrees) / Math.sin(90 - degrees)) * $el.width()) / 2);
            $el.css({
                'margin-top': margin + 'px',
                'margin-bottom': margin + 'px'
                //'width': height
            });
        },
        show = function(){
            $('.plugin_main',$plugin).show('slow');
            $('input,textarea', $plugin).val('');
            $('.error', $plugin).hide();
        },
        hide = function(){
            $('.plugin_main',$plugin).hide('slow');
            $('.error', $plugin).hide();
        };
    $container = $container ? $($container) : $('body');
    $container.append($plugin);
    var right = $(window).width() - ($container.offset().left - $(window).scrollLeft() + $container.width()),
        $caption = $('.plugin_caption', $plugin);
    $plugin.css({position: 'fixed', zIndex: 10000, right: right, top: '70px'});
    $_plugins_list.push($plugin);
    $caption
        .off('click')
        .click(function(){
            if($('.plugin_main:hidden',$plugin).length)
                show($plugin);
            else
                hide($plugin);
        });
    if(callback){
        if(typeof callback === "function")
            $('[type="submit"]',$plugin).off('click').click(function(e){
                e.preventDefault();
                callback.call(this, $(this).closest('form').serialize());
            });
        else if(typeof callback === "string")
            $('form', $plugin).attr('action', callback);
    }

    $('.contactUs_plugin', $plugin).css(_style_contactUs_plugin);
    $('.plugin_caption', $plugin).css(_style_plugin_caption);
    rotate($('.plugin_caption', $plugin), 270);
    $('.plugin_main', $plugin).css(_style_plugin_main);
    $('.plugin_title', $plugin).css(_style_plugin_title);
    $('form', $plugin).css(_style_plugin_form);
    $('form>div', $plugin).css(_style_plugin_form_div);
    $('input,textarea', $plugin).css(_style_plugin_input);
    $('.error', $plugin).css(_style_plugin_error);
    $('input[type="submit"],input[type="reset"],input[type="button"],button', $plugin).css(_style_plugin_button);
    return {
        remove: function(){
            $plugin.remove();
            return $plugin;
        },
        show: show,
        hide: hide,
        error: function(message){
            $('.error', $plugin).show();
            if(message)
                $('.error>span', $plugin).html(': '+message);
            else
                $('.error>span', $plugin).html('');
        }
    };
};

//ADD default plugin
$(document).ready(function(){
    var lang = false;
    $.ajax({
        url: '/js_lang/preset/contact?json=1',
        async: false,
        type: "GET",
        dataType: "json",
        success: function(data){
            if(data.success){
                lang = data.lang;
            }
        }
    });

    var main_contuctUs_plugin = new contactUs_plugin(function(data){
        $.ajax({
            url: '/property_utils/contactus',
            data: data,
            async: true,
            type: "POST",
            dataType: "json",
            success: function(data){
                if(data.success){
                    main_contuctUs_plugin.hide();
                }else
                    main_contuctUs_plugin.error();
            },
            error: function(){
                main_contuctUs_plugin.error();
            }
        });
    }, false, lang);
});
