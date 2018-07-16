import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/classifylist.css";
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/img/u137.png');
var viewLoadImg = require('./../asset/img/u115.png');

$(function () {
    $('.vr-type').html(localStorage.getItem('vr-name'));
    var list = [{
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '20',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '21',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '22',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '23',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '24',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '25',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '26',
        name: '热度排行'
    }, {
        url: '',
        id: '27',
        viewTimes: '99',
        downloadTimes: '99',
        id: '28',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '29',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '30',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '31',
        name: '热度排行'
    }, {
        url: '',
        viewTimes: '99',
        downloadTimes: '99',
        id: '32',
        name: '热度排行'
    }];

    function initList(list) {
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
                        <span>${element.downloadTimes}</span>
                    </p>
                </div>
            </div>
            `
            $(thisDom).appendTo($('.vr-list'));
        });
    }

    var pageNum = 1;
    var pageRows = 12;
    var pageNumLength = 1;
    var pagesList = {};

    function getDatas() {
        pagesList = {
            total: 100,
            rows: list,
        }
        $('.total-num').html(pagesList.total);
        $('.page-total-num').html(parseInt(pagesList.total / pageRows));
    }
    getDatas();

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
    // 点击页码
    $('.pagination-num').on('click', 'li', function () {
        $('.pagination-num').find('a').removeClass('active');
        $(this).find('a').addClass('active');
        pageNum = parseInt($(this).find('a').html());
        $('.page-num').html(pageNum);
    });

    function initPage() {
        pageNumLength = parseInt(pagesList.total / pageRows);
        if (pageNumLength > 0 && pageNumLength <= 5) {
            for (let index = pageNumLength; index > 1; index--) {
                var pageDom = `
                <li>
                <a value="${index}">${index}</a>
                </li>
                `
                $(pageDom).insertAfter('.first-pageNum');
            }
        } else {
            for (let index = 5; index > 1; index--) {
                var pageDom = `
                <li>
                <a value="${index}">${index}</a>
                </li>
                `
                $(pageDom).insertAfter('.first-pageNum');
            }
        }
        initList(pagesList.rows);
    };
    initPage();

    // 上一页
    $('.prev').on('click', function () {
        if (pageNum != 1) {
            $('.pagination-num').find('a').removeClass('active');
            $('.pagination-num').find('li').eq(pageNum - 2).find('a').addClass('active');
            pageNum--;
            $('.page-num').html(pageNum);
        }
    });
    // 下一页
    $('.next').on('click', function () {
        if (pageNum == pageNumLength) {
            return;
        } else if (pageNum >= 5) {
            pageNum++;
            $('.pagination-num').empty();
            for (let index = pageNum - 4; index <= pageNum; index++) {
                var pageDom = `
                <li>
                <a value="${index}">${index}</a>
                </li>
                `
                $('.pagination-num').append($(pageDom));
            }
            $('.pagination-num').find('li').eq(4).find('a').addClass('active');
            $('.page-num').html(pageNum);

        } else {
            $('.pagination-num').find('a').removeClass('active');
            $('.pagination-num').find('li').eq(pageNum).find('a').addClass('active');
            pageNum++;
            $('.page-num').html(pageNum);
        }
    });
    // 首页
    $('.first-page').on('click', function () {
        if (pageNum != 1) {
            $('.pagination-num').find('a').removeClass('active');
            $('.pagination-num').find('li').eq(0).find('a').addClass('active');
            pageNum = 1;
            $('.page-num').html(pageNum);
        }
    });
    // 尾页
    $('.last-page').on('click', function () {
        if (pageNum != pageNumLength) {
            $('.pagination-num').find('a').removeClass('active');
            $('.pagination-num').find('li').eq(pageNumLength - 1).find('a').addClass('active');
            pageNum = pageNumLength;
            $('.page-num').html(pageNum);
        }
    });
});