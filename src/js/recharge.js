import "bootcss";
import "jquery";
import "bootjs";
import "./lib/remodal/remodal.css";
import "./lib/remodal/remodal-default-theme.css";
import "./lib/remodal/remodal.min.js";
import "../css/style.css";
import "../css/recharge.css";
import "./lib/qrcode.min.js"
import {
    checkLoginStatus,
    loginStatus
} from './util';
$(document).ready(function () {
    var wechatModal = $("[data-remodal-id=wechatModal]").remodal();
    var wechatUrl;
    function generateQRCode(rendermethod, picwidth, picheight, url) {
        $("#qrcode").qrcode({ 
                render: rendermethod, // 渲染方式有table方式（IE兼容）和canvas方式
                width: picwidth, //宽度 
                height:picheight, //高度 
                text: utf16to8(url), //内容 
                typeNumber:-1,//计算模式
                correctLevel:2,//二维码纠错级别
                background:"#ffffff",//背景颜色
                foreground:"#000000"  //二维码颜色
     
            });
        }
        function init() {
            generateQRCode("canvas",150, 150, wechatUrl);
        }
            //中文编码格式转换
        function utf16to8(str) {
            var out, i, len, c;
            out = "";
            len = str.length;
            for (i = 0; i < len; i++) {
                c = str.charCodeAt(i);
                if ((c >= 0x0001) && (c <= 0x007F)) {
                    out += str.charAt(i);
                } else if (c > 0x07FF) {
                    out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                    out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                } else {
                    out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                    out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
                }
            }
            return out;
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
        }else if(value > 0 && payType == 4) {
            // 微信
            $.ajax({
                url: '/api/paymentCTL',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    method: 'payment_wechat',
                    username: localStorage.getItem('userName'),
                    sum: value
                }),
                success: function (res) {
                    // window.open(res.url)
                    wechatUrl = res.url;
                    init();
                    wechatModal.open();
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