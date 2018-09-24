import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/recharge.css";
import {
    checkLoginStatus,
    loginStatus
} from './util';
$(document).ready(function () {
    // 检查是否登录
    checkLoginStatus();
    Object.defineProperty(loginStatus, 'status', {
        set: function () {
            checkLoginType();
        }
    });
    loginStatus.status = '';
    // 获取登录信息
    let userType;

    function checkLoginType() {
        userType = localStorage.getItem('userType');
        if (!userType || userType == 0) {
            window.location.href = './index.html';
        }
    }
    $('.user-name').html(localStorage.getItem('userName'));
    $('.btn-recharge').on('click', function () {
        var value = $("input[name='money']:checked").val();;
        if (value == '0') {
            value = $('.input-number').val();
        }
        if (value > 0) {
            $.ajax({
                url: '/api/paymentCTL',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    method: ' payment_alipay',
                    username: localStorage.getItem('userName'),
                    sum: value
                }),
                success: function (res) {
                    window.open(res.url)
                }
            });
        } else {
            alert('请输入正确的金额！！');
        }
    });
    $('.input-number').bind('input propertychange', function () {
        if ($(this).val() > 0) {
            $('.input-value').html(parseInt($(this).val()))
        }else {
            $('.input-value').html(0)
        }
    });
    $('input').click(function () {
        console.log($(this).val())
    })

});