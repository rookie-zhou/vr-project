import "bootcss";
import "jquery";
import 'bootjs';
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import "../css/style.css";
import './../css/register.css';

$(document).ready(function () {
    
    // 弹框
    var loginModal = $('[data-remodal-id=registerModal]').remodal();
    var param = {
        page: 'member',
        agree: true,
        memName: false,
        memPhone: false,
        memEmail: false,
        memPassword: false,
        memConfirm: false,
        group: {
            type: '1',
            name: false,
            phoneNo: false,
            email: false,
            idNo: false,
            realName: false,
            QQ: false,
            groupNo: false,
            groupName: false,
            wechat: false,
            password: false,
            confirm: false,
        }
    }

    // 正则表达式
    var regular = {
        name: /^[0-9a-zA-Z_]{5,}$/,
        phoneNo: /^[1][0-9]{10}$/,
        email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
        password: /^[0-9a-zA-Z_]{5,}$/,
        idNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
        chinese: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3])*$/,
        groupNo: /^[0-9a-zA-Z]+$/,
        QQ: /^[1-9][0-9]+$/,
        wechat: /^[a-zA-Z0-9_]+$/
    }

    // 切换会员注册和开发者注册
    $('.member-btn').on('click', function () {
        $('.content-member').show();
        $('.content-developer').hide();
        $('.title').html('会员注册');
        param.page = 'member';
        checkParams();
    });
    $('.developer-btn').on('click', function () {
        $('.content-member').hide();
        $('.content-developer').show();
        $('.title').html('开发者注册');
        param.page = 'developer';
        checkParams();
    });

    // 校验会员注册按钮是否可用
    function checkParams() {
        if (param.page == 'member' && param.memName && param.memConfirm && param.memPhone && param.memEmail && param.memPassword && param.agree) {
            // 解除禁用 注册按钮
            $('.post-btn').removeAttr('disabled');
        } else if (param.page == 'developer' && param.group.name && param.group.phoneNo && param.group.email && param.group.QQ && param.group.wechat && param.group.password && param.group.confirm && param.agree) {
            if (param.group.type == '1' && param.group.idNo && param.group.realName) {
                // 解除禁用 注册按钮
                $('.post-btn').removeAttr('disabled');
            } else if (param.group.type == '2' && param.group.groupNo && param.group.groupName) {
                // 解除禁用 注册按钮
                $('.post-btn').removeAttr('disabled');
            } else {
                // 禁用 注册按钮
                $('.post-btn').attr('disabled', 'disabled');
            }
        } else {
            // 禁用 注册按钮
            $('.post-btn').attr('disabled', 'disabled');
        }
    }

    // 会员注册
    // 用户名正则校验
    $('.mem-name').bind('input propertychange', function () {
        if (!regular.name.test($(this).val())) {
            $('.mem-name-notice').html('请输入正确的用户名');
            param.memName = false;
        } else {
            $('.mem-name-notice').html('');
            param.memName = true;
        }
        checkParams();
    });

    // 手机号正则
    $('.mem-phone').bind('input propertychange', function () {
        if (!regular.phoneNo.test($(this).val())) {
            $('.mem-phone-notice').html('请输入正确的手机号');
            param.memPhone = false;
        } else {
            $('.mem-phone-notice').html('');
            param.memPhone = true;
        }
        checkParams();
    });

    // 邮箱号正则
    $('.mem-email').bind('input propertychange', function () {
        if (!regular.email.test($(this).val())) {
            $('.mem-email-notice').html('请输入正确的邮箱地址');
            param.memEmail = false;
        } else {
            $('.mem-email-notice').html('');
            param.memEmail = true;
        }
        checkParams();
    });

    // 密码正则
    $('.mem-password').bind('input propertychange', function () {
        if (!regular.password.test($(this).val())) {
            $('.mem-password-notice').html('请输入有效的密码');
            param.memPassword = false;
        } else {
            $('.mem-password-notice').html('');
            param.memPassword = true;
        }
        checkParams();
    });

    // 确认密码
    $('.mem-confirm').bind('input propertychange', function () {
        if ($(this).val() != $('.mem-password').val()) {
            $('.mem-confirm-notice').html('请输入相同的密码');
            param.memConfirm = false;
        } else {
            $('.mem-confirm-notice').html('');
            param.memConfirm = true;
        }
        checkParams();
    });

    //  开发者注册部分
    // 个人
    $('.personal').on('click', function () {
        $('.group-li').hide();
        $('.personal-li').show();
        param.group.type = '1';
        checkParams()
    });

    //  企业
    $('.group').on('click', function () {
        $('.personal-li').hide();
        $('.group-li').show();
        param.group.type = '2';
        checkParams();
    });

    // 用户名正则校验
    $('.group-name').bind('input propertychange', function () {
        if (!regular.name.test($(this).val())) {
            $('.group-name-notice').html('请输入正确的用户名');
            param.group.name = false;
        } else {
            $('.group-name-notice').html('');
            param.group.name = true;
        }
        checkParams();
    });

    // 手机号正则
    $('.group-phone').bind('input propertychange', function () {
        if (!regular.phoneNo.test($(this).val())) {
            $('.group-phone-notice').html('请输入正确的手机号');
            param.group.phoneNo = false;
        } else {
            $('.group-phone-notice').html('');
            param.group.phoneNo = true;
        }
        checkParams();
    });

    // 邮箱号正则
    $('.group-email').bind('input propertychange', function () {
        if (!regular.email.test($(this).val())) {
            $('.group-email-notice').html('请输入正确的邮箱地址');
            param.group.email = false;
        } else {
            $('.group-email-notice').html('');
            param.group.email = true;
        }
        checkParams();
    });

    // 身份证号正则
    $('.group-idNo').bind('input propertychange', function () {
        if (!regular.idNo.test($(this).val())) {
            $('.group-idNo-notice').html('请输入正确的身份证号');
            param.group.idNo = false;
        } else {
            $('.group-idNo-notice').html('');
            param.group.idNo = true;
        }
        checkParams();
    });

    // 个人姓名正则
    $('.group-realName').bind('input propertychange', function () {
        if (!regular.chinese.test($(this).val())) {
            $('.group-realName-notice').html('请输入正确的姓名');
            param.group.realName = false;
        } else {
            $('.group-realName-notice').html('');
            param.group.realName = true;
        }
        checkParams();
    });

    // 统一社会信用代码正则
    $('.group-groupNo').bind('input propertychange', function () {
        if (!regular.groupNo.test($(this).val())) {
            $('.group-groupNo-notice').html('请输入正确的统一社会信用代码');
            param.group.groupNo = false;
        } else {
            $('.group-groupNo-notice').html('');
            param.group.groupNo = true;
        }
        checkParams();
    });

    // 企业名称正则
    $('.group-groupName').bind('input propertychange', function () {
        if (!regular.chinese.test($(this).val())) {
            $('.group-groupName-notice').html('请输入正确的企业名');
            param.group.groupName = false;
        } else {
            $('.group-groupName-notice').html('');
            param.group.groupName = true;
        }
        checkParams();
    });

    // QQ正则
    $('.group-QQ').bind('input propertychange', function () {
        if (!regular.QQ.test($(this).val())) {
            $('.group-QQ-notice').html('请输入正确的QQ号');
            param.group.QQ = false;
        } else {
            $('.group-QQ-notice').html('');
            param.group.QQ = true;
        }
        checkParams();
    });

    // 微信正则
    $('.group-wechat').bind('input propertychange', function () {
        if (!regular.wechat.test($(this).val())) {
            $('.group-wechat-notice').html('请输入正确的QQ号');
            param.group.wechat = false;
        } else {
            $('.group-wechat-notice').html('');
            param.group.wechat = true;
        }
        checkParams();
    });

    // 邮箱号正则
    $('.group-password').bind('input propertychange', function () {
        if (!regular.password.test($(this).val())) {
            $('.group-password-notice').html('请输入有效的密码');
            param.group.password = false;
        } else {
            $('.group-password-notice').html('');
            param.group.password = true;
        }
        checkParams();
    });

    // 确认密码
    $('.group-confirm').bind('input propertychange', function () {
        if ($(this).val() != $('.group-password').val()) {
            $('.group-confirm-notice').html('请输入相同的密码');
            param.group.confirm = false;
        } else {
            $('.group-confirm-notice').html('');
            param.group.confirm = true;
        }
        checkParams();
    });

    // 校验是否勾选同意协议
    $("#agree").change(function () {
        if ($("#agree").is(":checked")) {
            param.agree = true;
        } else {
            param.agree = false;
        }
        checkParams();
    });

    // 注册
    $('.post-btn').on('click', function () {
        if (param.page == 'member') {
            // 会员注册
            const data = {
                method: 'register',
                usertype: '01',
                username: $('.mem-name').val(),
                mobileNo: $('.mem-phone').val(),
                email: $('.mem-email').val(),
                password: $('.mem-password').val(),
            }
            $('.modal-title').html('会员注册');
            register(data);
        } else {
            // 开发者注册
            $('.modal-title').html('开发者注册');
            const usertype = $("input[name='type']:checked").val();
            if (usertype == '02') {
                // 个人
                const data = {
                    method: 'register',
                    usertype: usertype,
                    username: $('.mem-name').val(),
                    mobileNo: $('.mem-phone').val(),
                    email: $('.mem-email').val(),
                    password: $('.mem-password').val(),
                    idcardNo: $('.group-idNo').val(),
                    fullname: $('.group-realName').val(),
                    qq: $('.group-QQ').val(),
                    weixin: $('.group-wechat').val()
                }
                register(data);
            } else {
                // 企业
                const data = {
                    method: 'register',
                    usertype: usertype,
                    username: $('.mem-name').val(),
                    mobileNo: $('.mem-phone').val(),
                    email: $('.mem-email').val(),
                    password: $('.mem-password').val(),
                    socialNo: $('.group-groupNo').val(),
                    fullname: $('.group-groupName').val(),
                    qq: $('.group-QQ').val(),
                    weixin: $('.group-wechat').val()
                }
                register(data);
            }

        }
    });

    function register(data) {
        $.ajax({
            type: 'post',
            url: '/api/userCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (res) {
                if (res.result) {
                    window.location.href = './login.html';
                } else {
                    loginModal.open();
                }
            },
            error: function () {
                loginModal.open();
            }
        });
    }
});