import "bootcss";
import "jquery";
import 'bootjs';
import "../css/style.css";
import './../css/register.css';

$(function () {
    var regular = {
        name: /^[a-zA-z]\w{3,15}$/
    }

    $('.mem-name').bind('input propertychange', function () {
        if (!regular.name.test($(this).val())) {
            $('.mem-name-notice').html('请输入正确的用户名');
        } else {
            $('.mem-name-notice').html('');
        }
    });

    // 切换会员注册和开发者注册
    $('.member-btn').on('click', function () {
        $('.content-member').show();
        $('.content-developer').hide();
    })
    $('.developer-btn').on('click', function () {
        $('.content-member').hide();
        $('.content-developer').show();
    })

    $("#agree").change(function () {
        console.log($("#agree").is(":checked"));
    });

})