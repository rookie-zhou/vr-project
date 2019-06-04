import "bootcss";
import "jquery";
import "bootjs";
import "./lib/remodal/remodal.css";
import "./lib/remodal/remodal-default-theme.css";
import "./lib/remodal/remodal.min.js";
import "../css/style.css";
import "../css/recharge.css";
import {
    checkLoginStatus,
    loginStatus
} from './util';
$(document).ready(function () {
    var wechatModal = $("[data-remodal-id=wechatModal]").remodal();
    var qrcode = new QRCode('qrcode', {
        text: 'test',
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    function openWechatCode(wechatUrl) {
        qrcode.clear(); // 清除代码
        qrcode.makeCode(wechatUrl);
        wechatModal.open();
    }
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
        var value = $("input[name='money']:checked").val();
        if (value == '0') {
            value = $('.input-number').val();
        }
        var payType = $("input[name='payType']:checked").val();
        if (value > 0 && payType == 3) {
            // 支付宝
            $.ajax({
                url: '/paymentCTL',
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
        } else if (value > 0 && payType == 4) {
            // 微信
            $.ajax({
                url: '/paymentCTL',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    method: 'payment_wechat',
                    username: localStorage.getItem('userName'),
                    sum: value
                }),
                success: function (res) {
                    openWechatCode('test');
                    if (res.code_url) {
                        openWechatCode(res.code_url);
                        $('.je').text((res.je / 100).toFixed(2));
                    }else {
                        alert(res.error)
                    }
                }
            });
        } else {
            window.parent.showAlertParent('请输入正确的金额！！');
        }
    });
    $('.input-number').bind('input propertychange', function () {
        if ($(this).val() > 0) {
            $('.input-value').html(parseInt($(this).val()) * coefficient)
        } else {
            $('.input-value').html(0)
        }
    });
    $.ajax({
        url: '/paymentCTL',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            method: 'getAccountInfo'
        }),
        success: function (res) {
            if (res.result.status == '01') {
                $('.balance').html(res.result.vrmoney + '维币')
            }
        }
    });
    $.ajax({
        url: '/publicCTL',
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