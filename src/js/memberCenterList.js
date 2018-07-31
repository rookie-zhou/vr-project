import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/memberCenterList.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
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
            var thisDom = `
            <div class="col-xs-3">
                <div class="vr-box">
                    <img class="product-img" src="${element.homeImage}" type="${element.type}" id="${element.id}" alt="vr产品图片" width="100%">
                    <div>
                        <p class="name">${element.proname}</p>
                        <p class="id-box">
                            <span>ID:</span>
                            <span class="id">${element.id}</span>
                        </p>
                    </div>
                </div>
            </div>
            `
            $(thisDom).appendTo($('.vr-list'));
        });
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
                if (res > 0) {
                    $('.empty-data').hide();
                    initLookList(res);
                } else {
                    $('.empty-data').show();
                }
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
                    <img class="product-img" src="${element.homeImage}" type="${element.type}" id="${element.id}" alt="vr产品图片" width="100%">
                    <div>
                        <p class="name">${element.proname}</p>
                        <p class="id-box">
                            <span>ID:</span>
                            <span class="id">${element.id}</span>
                            <br>
                            <button class="del-btn" id="${element.id}" commitId="${element.goodid}" type="${element.type}">删除</button>
                        </p>
                    </div>
                </div>
            </div>
            `
            $(thisDom).appendTo($('.vr-list'));
        });
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
                if (res > 0) {
                    $('.empty-data').hide();
                    initCollectionList(res);
                } else {
                    $('.empty-data').show();
                }
            }
        });
    }




    switch (iframeType) {
        case '0':
            // 收藏列表
            collectionList();
            break;
        case '1':
            // 浏览记录
            getList('my_look');
            break;
        case '2':
            // 我的点赞
            getList('my_praise');
            break;
        case '3':
            // 购买的模型
            getList('my_look');
            break;
        case '4':
            // 发布的模型
            break;
        case '5':
            // 发布的模型
            break;
        default:
            // 收藏列表
            collectionList();
            break;
    }
    // 点击图片跳转到产品详情页面
    $('.vr-list').on('click', '.product-img', function () {
        if ($(this).attr('type') == '01') {
            window.top.location.href = '/vrproduct.html?id=' + $(this).attr('id');
        } else {
            window.top.location.href = '/vrModel.html?id=' + $(this).attr('id');
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
                alert('删除失败');
            }
        });
    })
});