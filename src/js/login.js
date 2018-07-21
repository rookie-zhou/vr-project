import 'bootcss';
import 'jquery';
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import './ajax.js';
import './../css/style.css';
import './../css/login.css';
var backgroundImg = require('./../asset/login/u0.jpg');

$(document).ready(function () {

    $('.login').css('background-image', 'url(' + backgroundImg + ')');
    var params = {
        userName: false,
        password: false
    }
    var fogotPasswordModal = $('[data-remodal-id=fogotPasswordModal]').remodal();
    $('.forgot-password').on('click', function () {
        fogotPasswordModal.open();
    });
    // 登录
    $('.btn-login').on('click', function () {
        var userName = $('.user-name').val();
        var password = $('.password').val();
        $.ajax({
            url: '/userCTL',
            method: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'login',
                username: userName,
                password: password
            }),
            success: function (res) {
                if (res.result == '00') {
                    localStorage.setItem('userName', '');
                    localStorage.setItem('userType', '0');
                    $('.login-msg').html('用户名或密码错误');
                } else if (res.result == '01') {
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('userType', '1');
                    window.location.href = '/index.html';
                } else if (res.result == '02') {
                    localStorage.setItem('userType', '2');
                    window.location.href = '/index.html';
                    localStorage.setItem('userName', userName);
                } else if (res.result == '03') {
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('userType', '3');
                    window.location.href = '/index.html';
                }
            },
            error: function (res) {}
        })
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
        } else {
            params.userName = false;
        }
        checkParams();
    });
    // 密码校验
    $('.password').bind('input propertychange', function () {
        if ($(this).val()) {
            params.password = true;
        } else {
            params.password = false;
        }
        checkParams();
    });
});