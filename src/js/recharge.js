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
    var coefficient = 0
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
            window.parent.location.href = './index.html';
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
            window.parent.showAlertParent('请输入正确的金额！！');
        }
    });
    $('.input-number').bind('input propertychange', function () {
        if ($(this).val() > 0) {
            $('.input-value').html(parseInt($(this).val()) * coefficient)
        }else {
            $('.input-value').html(0)
        }
    });
    $.ajax({
        url: '/api/paymentCTL',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            method: ' getAccountInfo'
        }),
        success: function (res) {
            if (res.result.status == '01') {
                $('.balance').html(res.result.vrmoney + '维币')
            }
        }
    });
    $.ajax({
        url: '/api/publicCTL',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            method: ' RMB_VRMONEY'
        }),
        success: function (res) {
            coefficient = res.RMB_VRMONEY;
            $('.50-wb').html(res.RMB_VRMONEY * 50);
            $('.100-wb').html(res.RMB_VRMONEY * 100);
            $('.200-wb').html(res.RMB_VRMONEY * 200);
            $('.500-wb').html(res.RMB_VRMONEY * 500);
        }
    });

});