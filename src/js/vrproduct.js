import "bootcss";
import "jquery";
import "../css/style.css";
import './../css/vrproduct.css';
import {
    setIframeHeight,
    checkLoginStatus,
    loginStatus
} from './util';
// var videoUrl = require('./../asset/img/2.mp4');
// var videoUrl = 'http://pic.qiantucdn.com/58pic/28/73/01/66j58PICnrYnrG58PICZcpcds.mp4';

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
    }
    // 获取产品Id
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    const productId = getUrlParam('id');
    $.ajax({
        url: '/vrproductCTL',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            method: 'vrproduct_detailed',
            vrid: productId
        }),
        success: function (res) {
            initPage(res);
        }
    });

    // 加载页面数据
    function initPage(data) {
        $('.title').text(data.proname);
        $('.softsize').text(data.softsize);
        (data.collection) ? $('.collection').text(data.collection): $('.collection').text(0);
        (data.praise) ? $('.praise').text(data.praise): $('.praise').text(0);
        $('.downamount').text(data.downamount);
        if (data.publishtime) {
            $('.publishtime').text(new Date(data.publishtime.time).toLocaleString());
        }
        $('.name').text(data.user.fullname);
        $('.qq').text(data.user.qq);
        $('.wechat').text(data.user.weixin);
        $('.proIntro').text(data.proIntro);
        $('#video').children('source').attr('src', data.videourl);
        $('#video').attr('poster', data.homeImage);
        setIframeHeight();
    }
    // 点赞
    $('.add-praise').click(function () {
        $.ajax({
            url: '/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'praise_vr',
                commodityId: productId
            }),
            success: function (res) {
                if (res.result == '00') {
                    var tempwindow = window.open('_blank');
                    tempwindow.location = './login.html';
                } else if (res.result > 0) {
                    $('.praise').text(res.result);
                } else if (res.result == 'false') {
                    alert('点赞失败，请稍后重试！');
                } else {
                    alert(res);
                }
            },
            error: function (res) {
                alert(res);
            }
        });
    });
    // 收藏
    $('.add-collection').click(function () {
        if (userType) {
            $.ajax({
                url: '/tradingCTL',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    method: 'collect_vr',
                    commodityId: productId
                }),
                success: function (res) {
                    if (res.result == '00') {
                        var tempwindow = window.open('_blank');
                        tempwindow.location = './login.html';
                    } else if (res.result > 0) {
                        $('.collection').text(res.result);
                    } else if (res.result == 'false') {
                        alert('点赞失败，请稍后重试！');
                    } else {
                        alert(res);
                    }
                },
                error: function (res) {
                    alert(res);
                }
            });
        } else {
            alert('登录以后才能收藏');
        }
    });
    // 动态设置iframe高度
    setIframeHeight();
});