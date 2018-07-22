import "bootcss";
import "jquery";
import "../css/style.css";
import './../css/vrModel.css';

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
        type: 'post',
        url: '/api/modelCTL',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            method: 'model_detailed',
            modelid: productId
        }),
        success: function (res) {
            initPage(res)
        }
    });
    // 加载页面数据
    function initPage(data) {
        $('.title').text(data.name);
        $('.price-num').text(data.price);
        $('.downamount').text(data.downamount);
        $('.softsize').text(data.softsize);
        $('.collection').text(data.collection);
        $('.date').text(new Date(data.publishtime.time).toLocaleString());
        $('.lookcount').text(data.lookcount);
        $('.praise').text(data.praise);
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
});