import "../css/style.css";
import "../css/classifylist.css";
import "bootcss";
import "jquery";
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/index/u137.png');
var viewLoadImg = require('./../asset/index/u115.png');

$(function () {
    var list = [{
        url: '',
        viewTimes: '99',
        id: '20',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '21',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '22',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '23',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '24',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '25',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '22',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '23',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '24',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        id: '25',
        name: '热度排行'
    }];
    list.forEach(element => {
        if (!element.url) {
            element.url = productImg
        }
        var thisDom = `
        <div class="col-md-3">
            <div class="vr-box">
                <img class="product-img" src="${element.url}" alt="vr产品图片" width="100%">
                <p class="name">${element.name}</p>
                <p class="id-box">
                    <span>ID:</span>
                    <span class="id">${element.id}</span>
                </p>
                <p class="hot-num">
                    <img src="${viewLoadImg}" alt="">
                    <span>${element.viewTimes}</span>
                </p>
                <p class="hot-num" style="margin-left:20px">
                    <img src="${downLoadImg}" alt="">
                    <span>${element.viewTimes}</span>
                </p>
            </div>
        </div>
        `
        $(thisDom).appendTo($('.vr-list'));
    });

    // 点击不同排序
    $('.list-type').on('click', 'span', function () {
        $('.list-type').find('span').removeClass('active');
        $(this).addClass('active');
        const listType = $(this).attr('value');
    });
    // 点击图片跳转到产品详情页面
    $('.vr-list').on('click', '.vr-box', function () {
        window.location.href = '/vrproduct.html?id=' + $(this).find('.id').text();
    });
})