import "bootcss";
import "jquery";
import "../css/style.css";
import './../css/vrproduct.css';
// var videoUrl = require('./../asset/vrproduct/10n58PICCCvGWmIdQ58PIC4bW.mp4');
var videoUrl = 'http://pic.qiantucdn.com/58pic/28/73/01/66j58PICnrYnrG58PICZcpcds.mp4';

$(document).ready(function () {
    // 关闭浏览器 删除localstorage
    // window.onbeforeunload = function () {
    //     localStorage.setItem('userName', '');
    //     localStorage.setItem('userType', '');
    // };
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
            initPage(res)
        }
    });
    // 加载页面数据
    function initPage(data) {
        $('.softsize').text(data.softsize);
        $('.collection').text(data.collection);
        $('.praise').text(data.praise);
        $('.downamount').text(data.downamount);
        $('.publishtime').text(new Date(data.publishtime.time).toLocaleString());
        $('.name').text(data.user.fullname);
        $('.qq').text(data.user.qq);
        $('.wechat').text(data.user.weixin);
        $('.proIntro').text(data.proIntro);
        $('#video').children('source').attr('src', data.videourl);
        $('#video').attr('poster', data.homeImage);
        // $('#video').children('source').attr('src', videoUrl);
        // $('#video').attr('poster', 'http://img.zcool.cn/community/0142135541fe180000019ae9b8cf86.jpg@1280w_1l_2o_100sh.png');
    }

});