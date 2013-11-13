/**
 * Created with JetBrains PhpStorm.
 * User: Jack The Ripper
 * Date: 28.10.13
 * Time: 15:13
 * To change this template use File | Settings | File Templates.
 */

var objWi = function(){
    var $vidget = $('<div class="vidget"><form><div class="mainform"><p><span class="formtitle">Напишите нам</span></p><p><input class="email" type="email" name="email" placeholder="E-mail"><br></p>    <p><textarea class="textarea" name="comment" placeholder="Опишите проблему подробно"></textarea></p>    <p><input class="button" type="submit" value="Отправить сообщение">        <input  class="button-cancel" type="button" value="Отмена"></p>    </div></form><div class="button-slide">Slider</div></div>');

    var  vidgetStyle = {
        position: 'relative',
        top: '50px'
    },
         mainFormStyle = {
        width : '260px',
        height : '330px',
        'padding': '20px 25px',
        position : 'relative',
        'border-radius' : '0 10px 10px 0',
        float : 'left',
        background : 'rgba(50, 50, 500, .7)'
         },
     formTitleStyle = {
        font : 'bold 24px verdana',
        color : 'darkgreen'
     },
     emailStyle = {
        width : '250px',
        height: '25px',
        'padding-left': '10px',
        'border-radius': '5px',
        background: 'white'
     },
     textAreaStyle = {
        width: '250px',
        height: '180px',
        'padding-left': '10px',
        'padding-top': '10px',
        'border-radius': '5px',
        background: 'white'
     },
     buttonStyle = {
        background: 'blue',
        'border-radius': '5px'
     },
     buttonCancelStyle = {
        background: 'red',
        'border-radius': '5px'
     },
     buttonSlideStyle = {
        width: '50px',
        heigh: '30px',
        position: 'relative',
        float: 'left',
        top: '50px',
        background: 'darkorange'
    };
    var show = function(){
            if ($vidget.hasClass('visible')) return;
            $vidget.animate({
                'left': '+=300'
            }, 1000, function() {
                $(this).removeClass('invisible').addClass('visible');
            });
        },
        hide = function(){
            if ($vidget.hasClass('invisible')) return;
            $vidget.animate({
                'left': '-=300'
            }, 1000, function() {
                $(this).addClass('invisible').removeClass('visible');
            });
        },
        sendData = function() {
            return $('form').serialize();
        },
        callbackF = function(callback){
            if(typeof callback != "function") return;
            var sendForm = {};
            $('form', $vidget).submit(function(e) {
                e.preventDefault();
                sendForm.formData = $('form').serialize();
                callback(sendForm);
            });

        };

    $('body').append($vidget);
    $vidget.css(vidgetStyle);
    $('.mainform', $vidget).css(mainFormStyle);
    $('.formtitle', $vidget).css(formTitleStyle);
    $('.email', $vidget).css(emailStyle);
    $('.textarea', $vidget).css(textAreaStyle);
    $('.button', $vidget).css(buttonStyle);
    $('.button-cancel', $vidget).css(buttonCancelStyle);
    $('.button-slide', $vidget).css(buttonSlideStyle);


    $('.button-cancel', $vidget).click(function() {
        $vidget.remove();
    });
    $('.button-slide', $vidget).click(function() {
        if ($vidget.hasClass('invisible')) {
            show();
        } else {
            hide();
        }
    });
    hide();

    return {
        show: show,
        hide: hide,
        send: sendData,
        result: callbackF
    };
};



$(document).ready(function() {
    w = new objWi();
    w.result(function(arg) {
        alert(arg);
    })
});