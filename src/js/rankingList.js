import "bootcss";
import "jquery";
import '../css/rankingList.css'
var productImg = require('./../asset/index/phb1-img_u110.png');
var downLoadImg = require('./../asset/index/u137.png');
var viewLoadImg = require('./../asset/index/u115.png');

$(function () {
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
    $('.ranking').on('click', '.vr-box', function () {
        window.location.href = '/vrproduct.html?id=' + $(this).find('.id').text();
    })
})