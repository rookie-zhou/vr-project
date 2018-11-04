import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/table.css";
import {
    setIframeHeight,
    fmtDate
} from './util';
var productImg = require('./../asset/index/phb1-img_u110.png');
$(document).ready(function () {
    // 收藏列表
    function modelList(list) {
        $('tbody').empty();
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            if (element.publishtime.time) {
                element.publishtime.time = fmtDate(element.publishtime.time);
            }
            var thisDom;
            if (element.status_name == '审核通过') {
                thisDom = `
                    <tr>
                        <td style="width: 100px;">
                            <img src="${element.homeImage}" alt="" width="100%">
                        </td>
                        <td>${element.id}</td>
                        <td>${element.proname}</td>
                        <td>${element.lookcount}</td>
                        <td>${element.collection}</td>
                        <td>${element.praise}</td>
                        <td>${element.downamount}</td>
                        <td>${element.publishtime.time}</td>
                        <td>${element.status_name}</td>
                        <td>
                        <button class="btn del-btn" commitId="${element.id}">下架</button>
                        </td>
                    </tr>
                `
            } else {
                thisDom = `
                    <tr>
                        <td style="width: 100px;">
                            <img src="${element.homeImage}" alt="" width="100%">
                        </td>
                        <td>${element.id}</td>
                        <td>${element.proname}</td>
                        <td>${element.lookcount}</td>
                        <td>${element.collection}</td>
                        <td>${element.praise}</td>
                        <td>${element.downamount}</td>
                        <td>${element.publishtime.time}</td>
                        <td>${element.status_name}</td>
                        <td></td>
                    </tr>
                `
            }
            $(thisDom).appendTo($('tbody'));
        });
        setIframeHeight();
    }

    // 获取收藏列表数据
    function releaseSoftwareList() {
        $.ajax({
            url: '/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' my_publish_vr'
            }),
            success: function (res) {
                if (res.length > 0) {
                    $('.empty-data').hide();
                    modelList(res);
                } else {
                    $('.empty-data').show();
                }
            },
            error: function () {
                window.parent.showAlertParent('调用接口失败，请稍后重试');
            }
        });
    }
    releaseSoftwareList();

    // 下架
    $('tbody').on('click', '.del-btn', function () {
        $.ajax({
            url: '/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: 'stop_sold',
                commodityId: $(this).attr('commitId'),
                commodityType: '01'
            }),
            success: function (res) {
                if (res.result == true) {
                    window.parent.showAlertParent('下架成功！')
                    releaseSoftwareList();
                } else {
                    window.parent.showAlertParent('删除失败');
                }
            },
            error: function () {
                window.parent.showAlertParent('调用接口失败，请稍后重试');
            }
        });
    });
});