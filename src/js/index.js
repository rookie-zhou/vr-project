import 'bootcss';
import "jquery";
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './../css/style.css';
import './../css/index.css';

var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/index/u137.png');
var viewLoadImg = require('./../asset/index/u115.png');

$(function () {
    var indexModal = $('[data-remodal-id=indexModal]').remodal();
    // 获取登录信息
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    if (userType) {
        $('.user-name').html(userName);
        $('.login').hide();
    } else {
        $('.line-one').hide();
    }
    // 点击开发者中心
    $('.developer').on('click', function () {
        if (userType == '1') {
            $('.modal-text').html('普通会员不能进入开发者中心，请注册为开发者');
            indexModal.open();
        } else if (!userType) {
            $('.modal-text').html('请以开发者身份登录');
            indexModal.open();
        } else {
            window.location.href = '/login.html'
        }
    });
    // 点击关键词搜索
    $('.keywords').on('click', 'li', function () {
        $('.search-keyword').val($(this).children().text());
    });
    var hotList = [{
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
    }];
    var downloadList = [{
        url: '',
        downloadTimes: '99',
        id: '0',
        name: '下载排行'
    }, {
        url: '',
        downloadTimes: '99',
        id: '1',
        name: '下载排行'
    }, {
        url: '',
        downloadTimes: '99',
        id: '2',
        name: '下载排行'
    }, {
        url: '',
        downloadTimes: '99',
        id: '3',
        name: '下载排行'
    }, {
        url: '',
        downloadTimes: '99',
        id: '4',
        name: '下载排行'
    }, {
        url: '',
        downloadTimes: '99',
        id: '5',
        name: '下载排行'
    }];
    hotList.forEach(element => {
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
            </div>
        </div>
        `
        $(thisDom).appendTo($('.hot-ranking'));
    });
    downloadList.forEach(element => {
        var thisDom = `
        <div class="col-md-3">
            <div class="vr-box">
                <img class="product-img" src="${productImg}" alt="vr产品图片" width="100%">
                <p class="name">${element.name}</p>
                <p class="id-box">
                    <span>ID:</span>
                    <span class="id">${element.id}</span>
                </p>
                <p class="hot-num">
                    <img src="${downLoadImg}" alt="">
                    <span>${element.downloadTimes}</span>
                </p>
            </div>
        </div>
        `
        $(thisDom).appendTo($('.download-ranking'));
    });
    // 进入产品详情页面
    $('.ranking').on('click', '.vr-box', function () {
        window.location.href = '/vrproduct.html?id=' + $(this).find('.id').text();
    });
    // 加载列表
    $('ul').on('click', 'li', function () {
        console.log($(this).find('span').html())
        if ($(this).find('span').html() == '首页') {
            $('iframe').attr('src', '/rankingList.html');
        } else {
            $('iframe').attr('src', '/classifylist.html');
        }
    });
    $('.education-box').on('click', 'p', function (event) {
        event.stopPropagation();
        console.log($(this).html())
        if ($(this).html() == '首页') {
            $('iframe').attr('src', '/rankingList.html');
        } else {
            $('iframe').attr('src', '/classifylist.html');
        }
    });
});