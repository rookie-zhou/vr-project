import 'bootcss';
import 'jquery';
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './ajax.js';
import './../css/style.css';
import './../css/login.css';

$(function () {
    var params = {
        userName: false,
        password: false
    }
    var fogotPasswordModal = $('[data-remodal-id=fogotPasswordModal]').remodal();
    var loginModal = $('[data-remodal-id=loginModal]').remodal();
    $('.forgot-password').on('click', function () {
        fogotPasswordModal.open();
    });
    $('.btn-login').on('click', function () {
        $('.modal-title').html('正在登录');
        loginModal.open();
        // loginModal.close();
    });
    function checkParams() {
        if (params.userName && params.password) {
            // 解除禁用 注册按钮
            $('.btn-login').removeAttr('disabled');
        } else {
            // 禁用 注册按钮
            $('.btn-login').attr('disabled', 'disabled');
        }
    }
    // 用户名校验
    $('.user-name').bind('input propertychange', function () {
        if ($(this).val()) {
            params.userName = true;
        }else {
            params.userName = false;
        }
        checkParams();
    });
    // 密码校验
    $('.password').bind('input propertychange', function () {
        if ($(this).val()) {
            params.password = true;
        }else {
            params.password = false;
        }
        checkParams();
    });
});