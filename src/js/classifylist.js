import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/classifylist.css";
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/index/u137.png');
var viewLoadImg = require('./../asset/index/u115.png');

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

    var pagesList = {
        total: 100,
        rows: list,
    }

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
    $('.pagination').on('click', 'li', function () {
        $('.pagination').find('a').removeClass('active');
        $(this).find('a').addClass('active');
    });

    function initPage() {
        var pageNumList = parseInt(pagesList.total / pageRows);
        if (1 < pageNumList && pageNumList <= 5) {
            console.log(pageNumList)
            for (let index = 2; index <= pageNumList; index++) {
                var pageDom = `
                <li>
                    <a>${index}</a>
                </li>
                `
                $(pageDom).insertBefore('.next-btn');
            }
        } else if (pageNumList > 5) {
            for (let index = 2; index <= 5; index++) {
                var pageDom = `
                <li>
                    <a>${index}</a>
                </li>
                `
                $(pageDom).insertBefore('.next-btn');
            }
        }
        initList(pagesList.rows)
    };
    initPage();
})