import 'bootcss';
import "jquery";
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './../css/style.css';
import './../css/devIndex.css';

$(document).ready(function () {
    // 关闭浏览器 删除localstorage
    // window.onbeforeunload = function () {
    //     localStorage.setItem('userName', '');
    //     localStorage.setItem('userType', '');
    // };
    // 产品列表
    localStorage.setItem('modelOrProduct', '02');

    var indexModal = $('[data-remodal-id=indexModal]').remodal();
    // 获取登录信息
    const userName = localStorage.getItem('userName');
    const userType = localStorage.getItem('userType');
    $('.user-name').text(userName);
    // 获取关键词
    function getKeyWords() {
        $.ajax({
            url: '/searchinfoCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: 'search_getmostname',
                type: '02'
            }),
            success: function (res) {
                res.map(item => {
                    var keyWordsDom = `
                    <li>
                            <span class="font-12">${item}</span>
                        </li>
                    `
                    $(keyWordsDom).appendTo('.keywords');
                })
            }
        });
    }
    getKeyWords();

    // 点击关键词搜索
    $('.keywords').on('click', 'li', function () {
        $('.search-keyword').val($(this).children().text());
    });

    // 点击搜索按钮
    $('.search-btn').click(function () {
        $('iframe').attr('src', '/searchList.html');
        localStorage.setItem('search-name', $('.search-keyword').val());
    });

    // 初始化导航菜单
    function initNav(list) {
        list.forEach((item, index) => {
            var navDom;
            if (item.list) {
                navDom = `<li class="have-list have-list${index}">
                <span value="${item.typeId}">${item.typeName}</span>
                </li>`
                $(navDom).appendTo('.nav-list');
                var listBox = `<div class="list-unstyled small-box small-box${index}"></div>`;
                $(listBox).appendTo('.have-list' + index);
                item.list.forEach(elemnt => {
                    var smallList = `
                    <p value="${elemnt.typeId}">${elemnt.typeName}</p>
                    `
                    $(smallList).appendTo('.small-box' + index);
                });
            } else {
                navDom = `<li>
                <span value="${item.typeId}">${item.typeName}</span>
                </li>`
                $(navDom).appendTo('.nav-list');
            }
        });
    }

    // 获取导航菜单
    function getNavList() {
        $.ajax({
            url: '/modelTypeCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'modeltype_getall'
            }),
            success: function (res) {
                initNav(res);
                // 延时加载导航hover事件
                setTimeout(function () {
                    // 点击一级菜单
                    $('.nav-list').on('click', 'li', function () {
                        localStorage.setItem('vr-name', $(this).find('span').html());
                        localStorage.setItem('vr-type', $(this).find('span').attr('value'));
                        if ($(this).find('span').html() == '首页') {
                            $('iframe').attr('src', '/rankingList.html');
                        } else {
                            $('iframe').attr('src', '/classifyList.html');
                        }
                    });
                    // 点击二级菜单
                    $('.small-box').on('click', 'p', function (event) {
                        event.stopPropagation();
                        localStorage.setItem('vr-name', $(this).html());
                        localStorage.setItem('vr-type', $(this).attr('value'));
                        $('iframe').attr('src', '/classifyList.html');
                    });
                    // 鼠标移入nav 显示下拉框
                    $('.have-list').mouseover(function () {
                        $(this).find('.small-box').show();
                    });
                    // 鼠标移出nav 隐藏下拉框
                    $('.have-list').mouseleave(function () {
                        $(this).find('.small-box').hide();
                    });
                }, 500);
            }
        });
    }
    getNavList();

    // 鼠标移入显示客服联系方式
    $('.first-li').mouseover(function () {
        $('.detail1').css({
            left: '-228px'
        });
    });
    $('.first-li').mouseleave(function () {
        $('.detail1').css({
            left: '0'
        });
    });
    $('.second-li').mouseover(function () {
        $('.detail2').css({
            left: '-228px'
        });
    });
    $('.second-li').mouseleave(function () {
        $('.detail2').css({
            left: '0'
        });
    });

    // 回到顶部
    $('.top-btn').click(function () {
        window.scrollTo(0, 0);
    });

});