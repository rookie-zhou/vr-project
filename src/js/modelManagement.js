import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/modelManagement.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
import {
    setIframeHeight,
    fmtDate
} from './util';
$(document).ready(function () {
    var totalPageNum = 1;
    var pageNum = 1;
    var pageRows = 10;
    var searchParams = {
        method: ' getExamine_MODEL',
        paramName: '10',
        value: '',
        status: '',
        pageNumber: pageNum,
        rows: pageRows
    }

    function initList(list) {
        list.forEach(element => {
            var thisDate = '--'
            if (element.publishtime) {
                thisDate = fmtDate(element.publishtime.time);
            }
            var thisDom = `
            <tr>
                <td id="${element.id}">
                    <div class="checkbox">
                        <label>
                            <input class="checkbox-one" type="checkbox" name="checkId" value="${element.id}">
                        </label>
                    </div>
                </td>
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.type}</td>
                <td>${element.devUsername}</td>
                <td>${element.price}</td>
                <td>${thisDate}</td>
                <td><button modelId="${element.id}" class="btn btn-primary btn-detail">明细</button></td>
            </tr>
            `
            $(thisDom).appendTo($('.tbody-list'));
        });
        $('.btn-detail').click(function () {
            window.location.href = '/vrModel.html?id=' + $(this).attr('modelId');
        });
    }

    function getList(params) {
        $('.vr-pagination').empty();
        $.ajax({
            type: 'post',
            url: '/api/examineCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function (res) {
                $('.tbody-list').empty();
                if (res.data.length > 0) {
                    initList(res.data);
                    $('.noData').hide();
                } else {
                    $('.noData').show();
                }
                // 总条数
                $('.total-num').html(res.rowtotal);
                // 加载分页
                totalPageNum = res.pagetotal;
                // 总页数
                $('.total-PageNum').html(res.pagetotal);
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
                        searchParams.pageNumber = num;
                        getOtherPage(searchParams);
                    }
                });
                setIframeHeight();
            },
            error: function () {
                alert('获取列表数据失败请重试！');
            }
        });
    }

    getList(searchParams);

    function getOtherPage(params) {
        $.ajax({
            type: 'post',
            url: '/api/examineCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function (res) {
                $('.tbody-list').empty();
                if (res.data.length > 0) {
                    initList(res.data);
                    $('.noData').hide();
                } else {
                    $('.noData').show();
                }
                // 总条数
                $('.total-num').html(res.rowtotal);
                // 加载分页
                totalPageNum = res.pagetotal;
                // 总页数
                $('.total-PageNum').html(res.pagetotal);
                setIframeHeight();
            },
            error: function () {
                alert('获取列表数据失败请重试！');
            }
        });
    }

    $('.check-btn').click(function () {
        searchParams.status = '';
        $.each($('input[name=examine]:checked'), function () {
            if (searchParams.status == '') {
                searchParams.status = $(this).val();
            } else {
                searchParams.status = searchParams.status + ',' + $(this).val();
            }
        });
        searchParams.pageNumber = 1;
        searchParams.paramName = $('.name').val();
        searchParams.value = $('.value').val();
        getList(searchParams);
    });

    // 全选
    var idList = [];
    $('.checkbox-all').click(function () {
        if ($('input[name=checkId]').length == 0) {
            $('.checkbox-all').removeAttr('checked');
        } else {
            if ($(this).is(':checked')) {
                $.each($('input[name=checkId]'), function () {
                    $(this).prop('checked', true);
                });
            } else {
                $.each($('input[name=checkId]:checked'), function () {
                    $(this).removeAttr('checked');
                });
            }
        }
    });
    // 审核通过
    $('.through').click(function () {
        idList = [];
        $.each($('input[name=checkId]:checked'), function () {
            idList.push($(this).val());
        });
        var paramsList = {
            method: 'examine',
            commodityId: idList,
            commodityType: '02',
            examineStatus: '1',
        }
        if (idList.length > 0) {
            examine(paramsList);
        } else {
            alert('请选择需要审批的模型！')
        }
    });
    // 审核不通过
    $('.failed').click(function () {
        idList = [];
        $.each($('input[name=checkId]:checked'), function () {
            idList.push($(this).val());
        });
        var paramsList = {
            method: 'examine',
            commodityId: idList,
            commodityType: '02',
            examineStatus: '2',
            reason: $('.reason').val()
        }
        if (idList.length > 0 && $('.reason').val()) {
            examine(paramsList);
        } else {
            alert('请选择需要审批的模型,并填写审核不通过原因！')
        }
    });

    function examine(params) {
        $.ajax({
            type: 'post',
            url: '/api/examineCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function (res) {
                if (res == 'true') {
                    alert('审核通过！');
                    window.location.reload();
                }
            },
            error: function () {
                alert('调用接口失败请稍后再试！')
            }
        })
    }

});