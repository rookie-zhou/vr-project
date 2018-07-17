import "bootcss";
import "jquery";
import '../css/rankingList.css'
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/img/u137.png');
var viewLoadImg = require('./../asset/img/u115.png');

$(document).ready(function () {
    $('.ranking').on('click', '.vr-box', function () {
        window.top.location.href = '/vrproduct.html?id=' + $(this).find('.id').text();
    });
    // 下载排行榜
    function getDownLoadList() {
        $.ajax({
            url: '/api/vrproductCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: 'vrproduct_downphb'
            }),
            success: function (res) {
                if (res.length > 0) {
                    res.forEach(element => {
                        if (!element.homeImage) {
                            element.homeImage = productImg
                        }
                        var thisDom = `
                        <div class="col-md-3">
                            <div class="vr-box">
                                <img class="product-img" src="${element.homeImage}" alt="vr产品图片" width="100%">
                                <p class="name">${element.proname}</p>
                                <p class="id-box">
                                    <span>ID:</span>
                                    <span class="id">${element.id}</span>
                                </p>
                                <p class="hot-num">
                                    <img src="${downLoadImg}" alt="">
                                    <span>${element.downamount}</span>
                                </p>
                            </div>
                        </div>
                        `
                        $(thisDom).appendTo($('.download-ranking'));
                    });
                }
            }
        });
    }
    // 浏览热度排行榜
    function getHotList() {
        $.ajax({
            url: '/api/vrproductCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: 'vrproduct_lookphb'
            }),
            success: function (res) {
                if (res.length > 0) {
                    res.forEach(element => {
                        if (!element.homeImage) {
                            element.homeImage = productImg
                        }
                        var thisDom = `
                        <div class="col-md-3">
                            <div class="vr-box">
                                <img class="product-img" src="${element.homeImage}" alt="vr产品图片" width="100%">
                                <p class="name">${element.proname}</p>
                                <p class="id-box">
                                    <span>ID:</span>
                                    <span class="id">${element.id}</span>
                                </p>
                                <p class="hot-num">
                                    <img src="${viewLoadImg}" alt="">
                                    <span>${element.lookcount}</span>
                                </p>
                            </div>
                        </div>
                        `
                        $(thisDom).appendTo($('.hot-ranking'));
                    });
                }
            }
        });
    }
})