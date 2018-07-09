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
    $('.forgot-password').on('click', function () {
        fogotPasswordModal.open();
    });
    $('.btn-login').on('click', function () {
        var userName = $('.user-name').val();
        var password = $('.password').val();
        $.ajax({
            url: '/api/vrworkshop/userCTL',
            method: 'post',
            // dataType: 'json',
            contentType: 'application/json',
            data: {
                method: 'login',
                username: userName,
                password: password
            },
            success: function (res) {
                if (res == '00') {
                    $('.login-msg').html('用户名或密码错误');
                }
            },
            error: function (res) {
            }
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