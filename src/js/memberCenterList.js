import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/memberCenterList.css";
import {
    setIframeHeight,
    fmtDate
} from './util';
var productImg = require('./../asset/index/phb1-img_u110.png');
$(document).ready(function () {
    // 获取iframeType
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    const iframeType = getUrlParam('iframeType');


    // 初始化浏览记录
    function initLookList(list) {
        $('.vr-list').empty();
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            if (element.publishtime) {
                element.publishtime = fmtDate(element.publishtime);
            }
            var thisDom = `
            <div class="col-xs-3">
                <div class="vr-box">
                    <img class="product-img" src="${element.homeImage}" type="${element.commodityType}" id="${element.id}" alt="vr产品图片" width="100%">
                    <div>
                        <p class="name">${element.commodityName}
                            <span class="id-box">
                                <span class="time">${element.publishtime}</span>
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            `
            if (element.commodityType == '01') {
                $(thisDom).appendTo($('.list-first'));
            } else {
                $(thisDom).appendTo($('.list-second'));
            }
        });
        setIframeHeight();
    }
    // 获取浏览记录
    function getList(method) {
        $('.vr-list').empty();
        $.ajax({
            url: '/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: method
            }),
            success: function (res) {
                if (res.length > 0) {
                    $('.empty-data1').hide();
                    $('.empty-data2').hide();
                    initLookList(res);
                } else {
                    $('.empty-data1').show();
                    $('.empty-data2').show();
                }
            },
            error: function () {
                alert('调用接口失败，请稍后重试');
            }
        });
    }

    // 收藏列表
    function initCollectionList(list) {
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            var thisDom = `
            <div class="col-xs-3">
                <div class="vr-box">
                    <img class="product-img" src="${element.homeImage}" type="${element.commodityType}" id="${element.id}" alt="vr产品图片" width="100%">
                    <div>
                        <p class="name">${element.commodityName} 
                            <span class="id-box">
                                <span>ID:</span>
                                <span class="id">${element.id}</span>
                            </span>
                        </p>
                        <p class="btn-box">
                            <button class="del-btn" id="${element.id}" commitId="${element.commodityType}" type="${element.commodityType}">删除</button>
                        </p>
                    </div>
                </div>
            </div>
            `
            if (element.commodityType == '01') {
                $(thisDom).appendTo($('.list-first'));
            } else {
                $(thisDom).appendTo($('.list-second'));
            }
        });
        setIframeHeight();
    }

    // 获取收藏列表数据
    function collectionList() {
        $.ajax({
            url: '/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' my_collect'
            }),
            success: function (res) {
                if (res.length > 0) {
                    $('.empty-data1').hide();
                    $('.empty-data2').hide();
                    initCollectionList(res);
                } else {
                    $('.empty-data1').show();
                    $('.empty-data2').show();
                }
            },
            error: function () {
                alert('调用接口失败，请稍后重试');
            }
        });
    }

    switch (iframeType) {
        case '0':
            // 收藏列表
            collectionList();
            // initCollectionList(dataList);
            break;
        case '1':
            // 浏览记录
            getList('my_look');
            // initLookList(dataList);
            break;
        case '2':
            // 我的点赞
            getList('my_praise');
            // initLookList(dataList);
            break;
            case '3':
            $('.vr-Software').hide();
            // 购买的模型
            getList('my_buycommodity');
            // initLookList(dataList);
            break;
        default:
            // 收藏列表
            collectionList();
            break;
    }
    // 点击图片跳转到产品详情页面
    $('.vr-list').on('click', '.product-img', function () {
        if ($(this).attr('type') == '01') {
            window.location.href = '/vrproduct.html?id=' + $(this).attr('id');
        } else {
            window.location.href = '/vrModel.html?id=' + $(this).attr('id');
        }
    });
    // 删除收藏
    $('.vr-list').on('click', '.del-btn', function () {
        $.ajax({
            url: '/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' collect_delete',
                id: $(this).attr('id'),
                commodityId: $(this).attr('commitId'),
                commodityType: $(this).attr('type')
            }),
            success: function (res) {
                if (res.result == 'true') {
                    $(this).closest('.col-xs-3').remove();
                } else {
                    alert('删除失败');
                }
            },
            error: function () {
                alert('调用接口失败，请稍后重试');
            }
        });
    })
});