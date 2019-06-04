import "bootcss";
import "jquery";
import "./../css/style.css";
import "./../css/login.css";
var backgroundImg = require("./../asset/login/u0.jpg");

<<<<<<< HEAD
$(document).ready(function () {

    $('.login').css('background-image', 'url(' + backgroundImg + ')');
    var params = {
        userName: false,
        password: false
    }
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
                    window.opener.location.reload();
                } else if (res.result == '02') {
                    localStorage.setItem('userType', '2');
                    window.location.href = '/devIndex.html';
                    localStorage.setItem('userName', userName);
                    window.opener.location.reload();
                } else if (res.result == '03') {
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('userType', '3');
                    window.location.href = '/devIndex.html';
                    window.opener.location.reload();
                } else if (res.result == '04') {
                    localStorage.setItem('userName', userName);
                    localStorage.setItem('userType', '4');
                    window.location.href = '/management.html';
                    window.opener.location.reload();
                }
            },
            error: function (res) {}
        })
=======
$(document).ready(function() {
  $(".login").css("background-image", "url(" + backgroundImg + ")");
  var params = {
    userName: false,
    password: false
  };
  // 登录
  $(".btn-login").on("click", function() {
    var userName = $(".user-name").val();
    var password = $(".password").val();
    $.ajax({
      url: "/userCTL",
      method: "post",
      dataType: "json",
      contentType: "application/json",
      data: JSON.stringify({
        method: "login",
        username: userName,
        password: password
      }),
      success: function(res) {
        if (res.result == "00") {
          localStorage.setItem("userName", "");
          localStorage.setItem("userType", "0");
          $(".login-msg").html("用户名或密码错误");
        } else if (res.result == "01") {
          localStorage.setItem("userName", userName);
          localStorage.setItem("userType", "1");
          window.location.href = "/index.html";
          window.opener.location.reload();
        } else if (res.result == "02") {
          localStorage.setItem("userType", "2");
          window.location.href = "/devIndex.html";
          localStorage.setItem("userName", userName);
          window.opener.location.reload();
        } else if (res.result == "03") {
          localStorage.setItem("userName", userName);
          localStorage.setItem("userType", "3");
          window.location.href = "/devIndex.html";
          window.opener.location.reload();
        } else if (res.result == "04") {
          localStorage.setItem("userName", userName);
          localStorage.setItem("userType", "4");
          window.location.href = "/management.html";
          window.opener.location.reload();
        }
      },
      error: function(res) {}
>>>>>>> f82d6c2cb37b823655f1bfed91eee8d7bad94c0a
    });
  });

  function checkParams() {
    if (params.userName && params.password) {
      // 解除禁用 注册按钮
      $(".btn-login").removeAttr("disabled");
    } else {
      // 禁用 注册按钮
      $(".btn-login").attr("disabled", "disabled");
    }
  }
  // 用户名校验
  $(".user-name").bind("input propertychange", function() {
    if ($(this).val()) {
      params.userName = true;
    } else {
      params.userName = false;
    }
    checkParams();
  });
  // 密码校验
  $(".password").bind("input propertychange", function() {
    if ($(this).val()) {
      params.password = true;
    } else {
      params.password = false;
    }
    checkParams();
  });
});
