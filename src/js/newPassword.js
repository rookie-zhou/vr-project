import "bootcss";
import "jquery";
import 'bootjs';
import './lib/step/jquery.step.css';
import './lib/step/jquery.step.min.js';
import "../css/style.css";
import './../css/newPassword.css';
import {
    showAlertMsg
} from './util';
$(document).ready(function () {
    var nextBtnDisabled = false;
    var $step = $("#step");
    $step.step({
        index: 0,
        time: 100,
        title: ["填写账号信息", "身份验证", "设置新密码", "完成"]
    });
    // $step.getIndex();// 获取当前的index
    // $step.prevStep();// 上一步
    // $step.nextStep();// 下一步
    // $step.toStep(0);// 跳到指定步骤
    $('.btn-next').click(function () {
        if (!nextBtnDisabled) {
            return;
        }
        var postData = {};
        if ($step.getIndex() == 0) {
            postData = {
                method: 'findpassword_checkuseremail',
                username: $('.user-name').val(),
                email: $('.email').val()
            }
            ajaxFun(postData);
        } else if ($step.getIndex() == 1) {
            postData = {
                method: 'findpassword_checkcode',
                username: $('.user-name').val(),
                checkcode: $('.email-code').val()
            }
            ajaxFun(postData);
        } else if ($step.getIndex() == 2) {
            postData = {
                method: 'findpassword_resetpassword',
                username: $('.user-name').val(),
                newpassword: $('.password').val()
            }
            ajaxFun(postData);
        }
    });

    function showIndex(params) {
        $('.step').hide();
        $('.step-' + params).show();
    }

    function ajaxFun(data) {
        for (const key in data) {
            if (!data[key]) {
                return showAlertMsg('数据提交失败，所有字段不能为空！')
            }
        }
        $.ajax({
            url: '/findPasswordCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (res) {
                console.log(typeof (res.result))
                let data;
                if (typeof (res.result) === 'string') {
                    data = res.result
                } else {
                    data = res.result.toString()
                }
                if (data == 'true') {
                    $step.nextStep();
                    showIndex($step.getIndex());
                } else {
                    showAlertMsg('数据提交失败请稍后重试！')
                }
            },
            error: function () {
                showAlertMsg('调用接口失败，请稍后重试');
            }
        });
    }

    $('.send-code').click(function () {
        if ($('.user-name').val() && $('.email').val()) {
            $.ajax({
                url: '/findPasswordCTL',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify({
                    method: 'findpassword_sendcode',
                    username: $('.user-name').val(),
                    email: $('.email').val()
                }),
                success: function (res) {
                    if (res.result == true) {
                        showAlertMsg('验证码发送成功！');
                        nextBtnDisabled = true
                    } else {
                        showAlertMsg('验证码发送失败！');
                    }
                },
                error: function () {
                    showAlertMsg('调用接口失败，请稍后重试');
                }
            });
        } else {
            showAlertMsg('用户名和邮箱不能为空！');
        }
    });
});