import "bootcss";
import "jquery";
import 'bootjs';
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
import "../css/style.css";
import './../css/management.css';

$(document).ready(function () {
    // 检查是否登录
    checkLoginStatus();
    Object.defineProperty(loginStatus, 'status', {
        set: function () {
            // checkLoginType();
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
})