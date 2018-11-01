import "bootcss";
import "jquery";
import '../css/rankingList.css'
import {
    setIframeHeight
} from './util';
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/img/u137.png');
var viewLoadImg = require('./../asset/img/u115.png');
var saleImg = require('./../asset/img/sale.png');

$(document).ready(function () {
    var modelOrProduct = localStorage.getItem('modelOrProduct');
    $('.ranking').on('click', '.product-img', function () {
        if (modelOrProduct == '01') {
            window.location.href = '/vrproduct.html?id=' + $(this).siblings('.id-box').find('.id').text();
        } else {
            window.location.href = '/vrModel.html?id=' + $(this).siblings('.id-box').find('.id').text();
        }
    });
    // 产品下载排行榜
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
                        $(thisDom).appendTo($('.ranking-2'));
                    });
                }
                setIframeHeight();
            },
            error: function() {
                window.parent.showAlertParent('查询产品下载排行榜失败请重试！');
            }
        });
    }
    // 产品浏览热度排行榜
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
                        $(thisDom).appendTo($('.ranking-1'));
                    });
                }
                setIframeHeight();
            },
            error: function() {
                window.parent.showAlertParent('查询产品浏览热度排行榜失败请重试！');
            }
        });
    }
    // 模型销量排行榜
    function getModelDownLoadList() {
        $.ajax({
            url: '/api/modelCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: 'model_salesphb'
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
                                <p class="name">${element.name} <span class="price">价格：<span>${element.price}维币</span></span></p>
                                <p class="id-box">
                                    <span>ID:</span>
                                    <span class="id">${element.id}</span>
                                </p>
                                <p class="hot-num">
                                    <img style="width: 15px;" src="${saleImg}" alt="">
                                    <span>${element.salesVolume}</span>
                                </p>
                            </div>
                        </div>
                        `
                        $(thisDom).appendTo($('.ranking-1'));
                    });
                }
                setIframeHeight();
            },
            error: function() {
                window.parent.showAlertParent('查询模型销量排行榜失败请重试！')
            }
        });
    }
    // 模型精品排行榜
    function getModelHotList() {
        $.ajax({
            url: '/api/modelCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' model_goods'
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
                                <p class="name">${element.name} <span class="price">价格：<span>${element.price}维币</span></span></p>
                                <p class="id-box">
                                    <span>ID:</span>
                                    <span class="id">${element.id}</span>
                                </p>
                                <p class="hot-num">
                                    <img style="width: 15px;" src="${saleImg}" alt="">
                                    <span>${element.salesVolume}</span>
                                </p>
                            </div>
                        </div>
                        `
                        $(thisDom).appendTo($('.ranking-2'));
                    });
                }
                setIframeHeight();
            },
            error: function() {
                window.parent.showAlertParent('查询模型精品排行榜失败请重试！');
            }
        });
    }
    if (modelOrProduct == '01') {
        // 产品
        getDownLoadList();
        getHotList();
        $('.title-1').text('浏览热度排行榜');
        $('.title-2').text('下载热度排行榜');
    } else if (modelOrProduct == '02') {
        // 模型
        $('.title-1').text('下载排行榜');
        $('.title-2').text('精品排行榜');
        getModelDownLoadList();
        getModelHotList();
    }
});