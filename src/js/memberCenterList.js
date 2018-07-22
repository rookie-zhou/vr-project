import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/memberCenterList.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
var productImg = require('./../asset/index/phb1-img_u110.png');
$(document).ready(function () {
    // 关闭浏览器 删除localstorage
    // window.onbeforeunload = function () {
    //     localStorage.setItem('userName', '');
    //     localStorage.setItem('userType', '');
    // };
    var data = [{
        "image": [],
        "lookcount": 0,
        "salesVolume": 600,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑04",
        "homeImage": "resource\\images-model\\建筑04.jpg",
        "id": 4,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 500,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑03",
        "homeImage": "resource\\images-model\\建筑03.jpg",
        "id": 3,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 1000,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑05",
        "homeImage": "resource\\images-model\\建筑05.jpg",
        "id": 5,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 2550,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑07",
        "homeImage": "resource\\images-model\\建筑06.jpg",
        "id": 7,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 1000,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑05",
        "homeImage": "resource\\images-model\\建筑05.jpg",
        "id": 5,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 2550,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑07",
        "homeImage": "resource\\images-model\\建筑06.jpg",
        "id": 7,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 1000,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑05",
        "homeImage": "resource\\images-model\\建筑05.jpg",
        "id": 5,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 2550,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑07",
        "homeImage": "resource\\images-model\\建筑06.jpg",
        "id": 7,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 1000,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑05",
        "homeImage": "resource\\images-model\\建筑05.jpg",
        "id": 5,
        "user": null,
        "status": 0
    }, {
        "image": [],
        "lookcount": 0,
        "salesVolume": 2550,
        "softsize": 0,
        "collection": 0,
        "goodid": 0,
        "type": "",
        "modeurl": "",
        "praise": 0,
        "devUsername": "",
        "price": 0,
        "intro": "",
        "publishtime": null,
        "name": "模型建筑07",
        "homeImage": "resource\\images-model\\建筑06.jpg",
        "id": 7,
        "user": null,
        "status": 0
    }]

    // 获取vr类型
    var searchName = localStorage.getItem('search-name');
    var type = localStorage.getItem('modelOrProduct');
    // 判断是产品列表还是模型列表
    var modelOrProduct = localStorage.getItem('modelOrProduct');

    // 收藏列表
    function initCollectionList(list) {
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            var thisDom = `
            <div class="col-xs-3">
                <div class="vr-box">
                    <img class="product-img" src="${element.homeImage}" alt="vr产品图片" width="100%">
                    <div>
                        <p class="name">${element.proname}</p>
                        <p class="id-box">
                            <span>ID:</span>
                            <span class="id">${element.id}</span>
                            <br>
                            <button class="del-btn">删除</button>
                        </p>
                    </div>
                </div>
            </div>
            `
            $(thisDom).appendTo($('.vr-list'));
        });
    }
    initCollectionList(data)

    // 获取产品列表数据
    function getProduceList() {
        $.ajax({
            url: '/api/searchinfoCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' searchinfo_vr',
                searchname: searchName
            }),
            success: function (res) {
                initList(res.result.data);
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
                        <button class="btn btn-primary">删除</button>
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
            url: '/api/searchinfoCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' searchinfo_model',
                searchname: searchName
            }),
            success: function (res) {
                initModelList(res);
            }
        });
    }

    // if (modelOrProduct == '01') {
    //     // 产品
    //     getProduceList();
    // } else if (modelOrProduct == '02') {
    //     // 模型
    //     getModelList();
    // }
    // 点击图片跳转到产品详情页面
    $('.vr-list').on('click', '.product-img', function () {
        if (modelOrProduct == '01') {
            window.top.location.href = '/vrproduct.html?id=' + $(this).siblings('.id-box').find('.id').text();
        } else {
            window.top.location.href = '/vrModel.html?id=' + $(this).siblings('.id-box').find('.id').text();
        }
    });
    // 删除收藏
    $('.vr-list').on('click', '.del-btn', function () {
        $(this).closest('.col-xs-3').remove()
    })
});