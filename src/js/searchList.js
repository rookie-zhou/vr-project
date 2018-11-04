import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/searchList.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/img/u137.png');
var viewLoadImg = require('./../asset/img/u115.png');
var saleImg = require('./../asset/img/sale.png');
$(document).ready(function () {

    // 获取vr类型
    var searchName = localStorage.getItem('search-name');
    var type = localStorage.getItem('modelOrProduct');
    // 判断是产品列表还是模型列表
    var modelOrProduct = localStorage.getItem('modelOrProduct');

    function initList(list) {
        list.forEach(element => {
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
                    <p class="hot-num" style="margin-left:20px">
                        <img src="${downLoadImg}" alt="">
                        <span>${element.downamount}</span>
                    </p>
                </div>
            </div>
            `
            $(thisDom).appendTo($('.vr-list'));
        });
    }

    // 获取产品列表数据
    function getProduceList() {
        $.ajax({
            url: '/searchinfoCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' searchinfo_vr',
                searchname: searchName
            }),
            success: function (res) {
                if (res.length > 0) {
                    initList(res);
                    $('.noData').hide();
                } else {
                    $('.noData').show();
                }
            }
        });
    }

    function initModelList(list) {
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            var thisDom = `
            <div class="col-md-3">
                <div class="vr-box">
                    <img class="product-img" src="${element.homeImage}" alt="vr产品图片" width="100%">
                    <p class="name">${element.name}</p>
                    <p class="id-box">
                        <span>ID:</span>
                        <span class="id">${element.id}</span>
                    </p>
                    <p class="hot-num">
                        <img src="${viewLoadImg}" alt="">
                        <span>${element.lookcount}</span>
                    </p>
                    <p class="hot-num" style="margin-left:20px">
                        <img style="width: 15px;" src="${saleImg}" alt="">
                        <span>${element.salesVolume}</span>
                    </p>
                </div>
            </div>
            `
            $(thisDom).appendTo($('.vr-list'));
        });
    }

    // 获取模型列表数据
    function getModelList() {
        $.ajax({
            url: '/searchinfoCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' searchinfo_model',
                searchname: searchName
            }),
            success: function (res) {
                if (res.length > 0) {
                    initModelList(res);
                    $('.noData').hide();
                } else {
                    $('.noData').show();
                }
            }
        });
    }

    if (modelOrProduct == '01') {
        // 产品
        getProduceList();
    } else if (modelOrProduct == '02') {
        // 模型
        getModelList();
    }
    // 点击图片跳转到产品详情页面
    $('.vr-list').on('click', '.product-img', function () {
        if (modelOrProduct == '01') {
            window.location.href = '/vrproduct.html?id=' + $(this).siblings('.id-box').find('.id').text();
        } else {
            window.location.href = '/vrModel.html?id=' + $(this).siblings('.id-box').find('.id').text();
        }
    });
});