import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/classifylist.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
import {
    setIframeHeight
} from './util';
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/img/u137.png');
var viewLoadImg = require('./../asset/img/u115.png');
var saleImg = require('./../asset/img/sale.png');


$(document).ready(function () {
    // 判断是产品列表还是模型列表
    var modelOrProduct = localStorage.getItem('modelOrProduct');

    // 初始化数据
    var orderType = 100;
    var totalPageNum = 1;
    var pageNum = 1;
    var pageRows = 12;
    // 获取vr类型
    $('.vr-name').html(localStorage.getItem('vr-name'));
    var vrType = localStorage.getItem('vr-type');

    function initList(list) {
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            var thisDom = `
            <div class="col-xs-3">
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
        $('.vr-list').empty();
        $.ajax({
            url: '/api/vrproductCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' vrproduct_findbytype',
                vrtype: vrType,
                pageNumber: pageNum,
                rows: pageRows,
                orderby: orderType
            }),
            success: function (res) {
                if (res.data.length > 0) {
                    initList(res.data);
                    $('.noData').hide();
                } else {
                    $('.noData').show();
                }
                // 总条数
                $('.total-num').html(res.rowtotal);
                // 加载分页
                var totalPageNum = res.pagetotal;
                // 总页数
                $('.total-PageNum').html(totalPageNum);
                setIframeHeight();
            },
            error: function() {
                alert('获取产品列表数据失败请重试！')
            }
        });
    }

    function initModelList(list) {
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            var thisDom = `
            <div class="col-xs-3">
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
        $('.vr-list').empty();
        $.ajax({
            url: '/api/modelCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' model_findbytype',
                vrtype: vrType,
                pageNumber: pageNum,
                rows: pageRows,
                orderby: orderType
            }),
            success: function (res) {
                if (res.data.length > 0) {
                    initModelList(res.data);
                    $('.noData').hide();
                } else {
                    $('.noData').show();
                }
                // 总条数
                $('.total-num').html(res.rowtotal);
                // 加载分页
                totalPageNum = res.pagetotal;
                // 总页数
                $('.total-PageNum').html(res.pagetotal);
                setIframeHeight();
            },
            error: function() {
                alert('获取模型列表数据失败请重试！')
            }
        });
    }


    // 点击不同排序
    $('.list-type').on('click', 'span', function () {
        $('.list-type').find('span').removeClass('active');
        $(this).addClass('active');
        orderType = $(this).attr('value');
        if (modelOrProduct == '01') {
            // 产品
            getProduceList();
        } else if (modelOrProduct == '02') {
            // 模型
            getModelList();
        }
    });
    // 点击图片跳转到产品详情页面
    $('.vr-list').on('click', '.product-img', function () {
        if (modelOrProduct == '01') {
            window.location.href = '/vrproduct.html?id=' + $(this).siblings('.id-box').find('.id').text();
        } else {
            window.location.href = '/vrModel.html?id=' + $(this).siblings('.id-box').find('.id').text();
        }
    });

    if (modelOrProduct == '01') {
        // 产品
        getProduceList();
    } else if (modelOrProduct == '02') {
        // 模型
        getModelList();
    }
    setTimeout(() => {
        var firstPage = false;
        $('.vr-pagination').simplePaging({
            allPage: totalPageNum, //总页数
            showPage: 5, //显示页数
            startPage: pageNum, //第一页页码数字
            initPage: pageNum, //加载完毕自动跳转到第n页(初始化激活页)
            initPageClick: true, //每次页面加载完毕后，是否触发initPage页的绑定事件
            first: "首页", //首页显示字符
            last: "尾页", //尾页显示字符
            prev: "上一页", //上一页显示字符
            next: "下一页", //下一页显示字符
            animateType: "animation",
            animationTime: 100,
            callBack: function (num) {
                pageNum = num;
                $('.page-num').html(pageNum);
                if (firstPage) {
                    if (modelOrProduct == '01') {
                        // 产品
                        getProduceList();
                    } else if (modelOrProduct == '02') {
                        // 模型
                        getModelList();
                    }
                }
            }
        });
        setTimeout(() => {
            firstPage = true;
        }, 200);
    }, 1000);
});