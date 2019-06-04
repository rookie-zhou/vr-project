import "bootcss";
import "jquery";
import 'bootjs';
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import "../css/style.css";
import './../css/memberCenter.css';
import {
    checkLoginStatus,
    loginStatus,
    GetQueryString,
    showAlertMsg
} from './util';
$(document).ready(function () {
    window.showAlertParent = function (content) {
        showAlertMsg(content)
    }
    // 检查是否登录
    checkLoginStatus();
    Object.defineProperty(loginStatus, 'status', {
        set: function () {
            checkLoginType();
        }
    });
    loginStatus.status = '';
    // 获取登录信息
    let userType;

    function checkLoginType() {
        userType = localStorage.getItem('userType');
        if (!userType || userType == 0) {
            window.location.href = './index.html';
        }
    }
    $('.user-name').html(localStorage.getItem('userName'));
    
    if (GetQueryString('recharge')) {
        $('#listIframe').attr('src', './recharge.html');
    }
    $('.nav-a').on('click', '.nav-href', function () {
        $('.nav-href').css({'color': '#00ccff'});
        $(this).css({'color': '#FFCC33'})
    });

    var indexModal = $('[data-remodal-id=indexModal]').remodal();
    // 点击开发者中心
    $('.developer').on('click', function () {
        if (userType == '1') {
            $('.modal-text').html('普通会员不能进入开发者中心，请注册为开发者');
            indexModal.open();
        } else if (!userType) {
            $('.modal-text').html('请以开发者身份登录');
            indexModal.open();
        } else {
            window.location.href = './devIndex.html'
        }
    });

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