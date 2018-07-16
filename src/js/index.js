import 'bootcss';
import "jquery";
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './../css/style.css';
import './../css/index.css';

$(function () {
    var navList = [{
        name: 'VR教育',
        id: '1',
        list: [{
            id: '1.1',
            name: '建筑教育'
        },{
            id: '1.2',
            name: 'K12教育'
        }]
    }, {
        name: 'VR家装',
        id: '2',
        list: [{
            id: '2.1',
            name: '欧式'
        },{
            id: '2.2',
            name: '美式'
        }]
    }, {
        name: 'VR工业',
        id: '3'
    }, {
        name: 'VR医疗',
        id: '4'
    }, {
        name: 'VR交通',
        id: '5'
    }, {
        name: 'VR军事',
        id: '6'
    }, {
        name: 'VR展馆',
        id: '7'
    }, {
        name: 'VR安防',
        id: '8'
    }, {
        name: '其他',
        id: '9'
    }];
    function getNav(list) {
        list.forEach((item, index) => {
            var navDom;
            if (item.list) {
                navDom = `<li class="have-list have-list${index}">
                <span value="${item.id}">${item.name}</span>
                </li>`
                $(navDom).appendTo('.nav-list');
                var listBox = `<div class="list-unstyled small-box small-box${index}"></div>`;
                $(listBox).appendTo('.have-list'+ index)
                item.list.forEach(elemnt => {
                    var smallList = `
                    <p value="${elemnt.id}">${elemnt.name}</p>
                    `
                    $(smallList).appendTo('.small-box' + index);
                });
            } else {
                navDom = `<li>
                <span value="${item.id}">${item.name}</span>
                </li>`
                $(navDom).appendTo('.nav-list');
            }
        });
    }
    getNav(navList);
    // 鼠标移入nav 显示下拉框
    $('.have-list').mouseover(function () {
        $(this).find('.small-box').show();
    });
    // 鼠标移出nav 隐藏下拉框
    $('.have-list').mouseleave(function () {
        $(this).find('.small-box').hide();
    });
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

    // 加载列表
    $('.nav-list').on('click', 'li', function () {
        localStorage.setItem('vr-name', $(this).find('span').html());
        localStorage.setItem('vr-type', $(this).find('span').attr('value'));
        
        if ($(this).find('span').html() == '首页') {
            $('iframe').attr('src', '/rankingList.html');
        } else {
            $('iframe').attr('src', '/classifyList.html');
        }
    });
    // 加载二级列表
    $('.small-box').on('click', 'p', function (event) {
        event.stopPropagation();
        localStorage.setItem('vr-name', $(this).html());
        localStorage.setItem('vr-type', $(this).attr('value'));
        if ($(this).html() == '首页') {
            $('iframe').attr('src', '/rankingList.html');
        } else {
            $('iframe').attr('src', '/classifyList.html');
        }
    });
});