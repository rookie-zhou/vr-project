import "bootcss";
import "jquery";
import "bootjs";
import "../css/style.css";
import "../css/softManagement.css";
import "./lib/page/simplePaging.css";
import "./lib/page/simplePaging.js";
import { setIframeHeight, fmtDate } from "./util";
$(document).ready(function() {
  var totalPageNum = 1;
  var pageNum = 1;
  var pageRows = 10;
  var dataList = [];
  var searchParams = {
    method: " getExamine_VR",
    paramName: "20",
    value: "",
    status: "",
    pageNumber: pageNum,
    rows: pageRows
  };

  function initList(list) {
    list.forEach(element => {
      var thisDate = "--";
      if (element.publishtime) {
        thisDate = fmtDate(element.publishtime.time);
      }
      var thisDom = `
            <tr>
                <td id="${element.id}">
                    <div class="checkbox">
                        <label>
                            <input class="checkbox-one" type="checkbox" name="checkId" value="${
                              element.id
                            }">
                        </label>
                    </div>
                </td>
                <td>${element.id}</td>
                <td>${element.proname}</td>
                <td><img src="${element.homeImage}"></td>
                <td>${thisDate}</td>
                <td>${element.status_name}</td>
                <td>${element.protype}</td>
                <td>${element.devUsername}</td>
                <td>${element.devUserfullname}</td>
                <td><button modelId="${
                  element.id
                }" class="btn btn-primary btn-detail">明细</button></td>
            </tr>
<<<<<<< HEAD
            `
            $(thisDom).appendTo($('.tbody-list'));
        });
        $('.btn-detail').click(function () {
            window.location.href = '/vrproduct.html?id=' + $(this).attr('modelId');
        });
    }

    function getList(params) {
        $('.vr-pagination').empty();
        $.ajax({
            type: 'post',
            url: '/examineCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function (res) {
                $('.tbody-list').empty();
                if (res.data.length > 0) {
                    dataList = res.data;
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
                $('.total-pageNum').html(res.pagetotal);
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
                window.parent.showAlertParent('获取列表数据失败请重试！');
            }
        });
    }

    function getOtherPage(params) {
        $.ajax({
            type: 'post',
            url: '/examineCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function (res) {
                $('.tbody-list').empty();
                if (res.data.length > 0) {
                    dataList = res.data;
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
                $('.total-pageNum').html(res.pagetotal);
                setIframeHeight();
            },
            error: function () {
                window.parent.showAlertParent('获取列表数据失败请重试！');
            }
        });
    }

    getList(searchParams);

    $('.check-btn').click(function () {
        searchParams.status = '';
        $.each($('input[name=examine]:checked'), function () {
            if (searchParams.status == '') {
                searchParams.status = $(this).val();
            } else {
                searchParams.status = searchParams.status + ',' + $(this).val();
            }
        });
        pageNum = 1;
        searchParams.paramName = $('.name').val();
        searchParams.value = $('.value').val();

        getList(searchParams);
=======
            `;
      $(thisDom).appendTo($(".tbody-list"));
    });
    $(".btn-detail").click(function() {
      window.location.href = "/vrproduct.html?id=" + $(this).attr("modelId");
>>>>>>> f82d6c2cb37b823655f1bfed91eee8d7bad94c0a
    });
  }

  function getList(params) {
    $(".vr-pagination").empty();
    $.ajax({
      type: "post",
      url: "/examineCTL",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(params),
      success: function(res) {
        $(".tbody-list").empty();
        if (res.data.length > 0) {
          dataList = res.data;
          initList(res.data);
          $(".noData").hide();
        } else {
          $(".noData").show();
        }
        // 总条数
        $(".total-num").html(res.rowtotal);
        // 加载分页
        totalPageNum = res.pagetotal;
        // 总页数
        $(".total-pageNum").html(res.pagetotal);
        $(".vr-pagination").simplePaging({
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
          callBack: function(num) {
            pageNum = num;
            $(".page-num").html(pageNum);
            searchParams.pageNumber = num;
            getOtherPage(searchParams);
          }
        });
        setIframeHeight();
      },
      error: function() {
        window.parent.showAlertParent("获取列表数据失败请重试！");
      }
    });
  }

  function getOtherPage(params) {
    $.ajax({
      type: "post",
      url: "/examineCTL",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(params),
      success: function(res) {
        $(".tbody-list").empty();
        if (res.data.length > 0) {
          dataList = res.data;
          initList(res.data);
          $(".noData").hide();
        } else {
          $(".noData").show();
        }
        // 总条数
        $(".total-num").html(res.rowtotal);
        // 加载分页
        totalPageNum = res.pagetotal;
        // 总页数
        $(".total-pageNum").html(res.pagetotal);
        setIframeHeight();
      },
      error: function() {
        window.parent.showAlertParent("获取列表数据失败请重试！");
      }
    });
  }

  getList(searchParams);

  $(".check-btn").click(function() {
    searchParams.status = "";
    $.each($("input[name=examine]:checked"), function() {
      if (searchParams.status == "") {
        searchParams.status = $(this).val();
      } else {
        searchParams.status = searchParams.status + "," + $(this).val();
      }
    });
    pageNum = 1;
    searchParams.paramName = $(".name").val();
    searchParams.value = $(".value").val();

    getList(searchParams);
  });

  // 全选
  var idList = [];
  $(".checkbox-all").click(function() {
    if ($("input[name=checkId]").length == 0) {
      $(".checkbox-all").removeAttr("checked");
    } else {
      if ($(this).is(":checked")) {
        $.each($("input[name=checkId]"), function() {
          $(this).prop("checked", true);
        });
      } else {
        $.each($("input[name=checkId]:checked"), function() {
          $(this).removeAttr("checked");
        });
      }
    }
  });
  // 审核通过
  $(".through").click(function() {
    var checkStatus = true;
    idList = [];
    $.each($("input[name=checkId]:checked"), function() {
      dataList.map(item => {
        if ($(this).val() == item.id && item.status == 1) {
          window.parent.showAlertParent("不能选择已通过审核的软件");
          checkStatus = false;
        }
      });
      idList.push($(this).val());
    });
<<<<<<< HEAD

    function examine(params) {
        $.ajax({
            type: 'post',
            url: '/examineCTL',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(params),
            success: function (res) {
                if (res.result == true) {
                    window.parent.showAlertParent('审核通过！');
                    window.location.reload();
                }
            },
            error: function () {
                window.parent.showAlertParent('调用接口失败请稍后再试！')
            }
        })
=======
    var paramsList = {
      method: "examine",
      commodityId: idList,
      commodityType: "01",
      examineStatus: "1"
    };
    if (idList.length > 0) {
      paramsList.commodityId = paramsList.commodityId.toString();
      if (checkStatus) {
        examine(paramsList);
      }
    } else {
      window.parent.showAlertParent("请选择需要审批的软件！");
>>>>>>> f82d6c2cb37b823655f1bfed91eee8d7bad94c0a
    }
  });
  // 审核不通过
  $(".failed").click(function() {
    idList = [];
    $.each($("input[name=checkId]:checked"), function() {
      idList.push($(this).val());
    });
    var paramsList = {
      method: "examine",
      commodityId: idList,
      commodityType: "01",
      examineStatus: "2",
      reason: $(".reason").val()
    };
    if (idList.length > 0 && $(".reason").val()) {
      paramsList.commodityId = paramsList.commodityId.toString();
      examine(paramsList);
    } else {
      window.parent.showAlertParent(
        "请选择需要审批的软件,并填写审核不通过原因！"
      );
    }
  });

  function examine(params) {
    $.ajax({
      type: "post",
      url: "/examineCTL",
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(params),
      success: function(res) {
        if (res.result == true) {
          window.parent.showAlertParent("审核通过！");
          window.location.reload();
        }
      },
      error: function() {
        window.parent.showAlertParent("调用接口失败请稍后再试！");
      }
    });
  }
});
