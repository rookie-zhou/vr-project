import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/table.css";
import {
    setIframeHeight
} from './util';
var productImg = require('./../asset/index/phb1-img_u110.png');
$(document).ready(function () {
    // 收藏列表
    function modelList(list) {
        list.forEach(element => {
            if (!element.homeImage) {
                element.homeImage = productImg
            }
            var thisDom = `
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
                <td>${element.publishtime}</td>
                <td>${element.status}</td>
                <td>
                    <button class="btn del-btn">下架</button>
                </td>
            </tr>
            `
            $(thisDom).appendTo($('tbody'));
        });
        setIframeHeight();
    }

    // 获取收藏列表数据
    function releaseSoftwareList() {
        $.ajax({
            url: '/api/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' my_publish_vr'
            }),
            success: function (res) {
                if (res > 0) {
                    $('.empty-data').hide();
                    modelList(res);
                } else {
                    $('.empty-data').show();
                }
            },
            error: function () {
                alert('调用接口失败，请稍后重试');
            }
        });
    }
    releaseSoftwareList();

    // 下架
    $('tbody').on('click', '.del-btn', function () {
        $(this).closest('tr').remove();
        $.ajax({
            url: '/api/tradingCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' collect_delete',
                id: $(this).attr('id'),
                commodityId: $(this).attr('commitId'),
                commodityType: $(this).attr('type')
            }),
            success: function (res) {
                if (res.result == 'true') {
                } else {
                    alert('删除失败');
                }
            },
            error: function () {
                alert('调用接口失败，请稍后重试');
            }
        });
    });
});