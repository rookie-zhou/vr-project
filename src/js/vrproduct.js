import "bootcss";
import "jquery";
import "../css/style.css";
import './../css/vrproduct.css';
// var videoUrl = require('./../asset/vrproduct/10n58PICCCvGWmIdQ58PIC4bW.mp4');
var videoUrl = 'http://pic.qiantucdn.com/58pic/28/73/01/66j58PICnrYnrG58PICZcpcds.mp4';

$(function () {
    $('#video').children('source').attr('src', videoUrl);
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    const productId = getUrlParam('id');
    console.log(productId)
    $.ajax({
        method: 'post',
        url: '/api/vrworkshop/vrproductCTL',
        data: {
            method: 'vrproduct_detailed',
            vrid: productId
        },
        success: function (res) {
            console.log(res)
        }
    })
})