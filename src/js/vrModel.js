import "bootcss";
import "jquery";
import "../css/style.css";
import './../css/vrModel.css';
import {
    setIframeHeight,
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
    }

    // 获取产品Id
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    const productId = getUrlParam('id');
    // 获取模型详情
    $.ajax({
        type: 'post',
        url: '/api/modelCTL',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            method: 'model_detailed',
            modelid: productId
        }),
        success: function (res) {
            initPage(res);
        }
    });
    setIframeHeight();
    // 加载页面数据
    function initPage(data) {
        $('.title').text(data.name);
        $('.price-num').text(data.price);
        $('.downamount').text(data.downamount);
        $('.softsize').text(data.softsize);
        (data.collection) ? $('.collection').text(data.collection): $('.collection').text(0);
        if (data.publishtime) {
            $('.date').text(new Date(data.publishtime.time).toLocaleString());
        }
        (data.praise) ? $('.praise').text(data.praise): $('.praise').text(0);
        $('.lookcount').text(data.lookcount);
        $('.text-intro').text(data.intro);
        if (data.image.length > 0) {
            data.image.map(item => {
                var dom = `
                    <img src="${item.imageUrl}" alt="${item.imageName}">
                `
                $(dom).appendTo('.img-box');
            });
        } else {
            $('.img-detail').hide();
        }
        $('.home-img').attr('src', data.homeImage).attr('alt', data.name);
    }
    // 点赞
    $('.add-praise').click(function () {
        $.ajax({
            url: '/api/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'praise_model',
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
                url: '/api/tradingCTL',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    method: 'collect_model',
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

});