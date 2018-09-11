import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/modelManagement.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
import {
    setIframeHeight
} from './util';
$(document).ready(function () {
    var totalPageNum = 1;
    var pageNum = 1;
    var pageRows = 10;

    function getList() {
        $.ajax({
            type: 'post',
            url: '/api/paymentCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' getExamine_MODEL',
                paramName: '10',
                value: '10',
                status: '',
                pageNumber: pageNum,
                rows: pageRows
            }),
            success: function (res) {
                console.log(res)
            }
        });
    }

    setTimeout(() => {
        var firstPage = false;
        $('.vr-pagination').simplePaging({
            allPage: totalPageNum, //总页数
            showPage: 5, //显示页数
            startPage: pageNum, //第一页页码数字
            initPage: pageNum, //加载完毕自动跳转到第n页(初始化激活页)
            initPageClick: true, //每次页面加载完毕后，是否触发initPage页的绑定事件
            first: "首页", //首页显示字符
            last: "尾页", //尾页显示字符
            prev: "上一页", //上一页显示字符
            next: "下一页", //下一页显示字符
            animateType: "animation",
            animationTime: 100,
            callBack: function (num) {
                pageNum = num;
                $('.page-num').html(pageNum);
                if (firstPage) {
                    getList();
                }
            }
        });
        setTimeout(() => {
            firstPage = true;
        }, 200);
    }, 1000);
});