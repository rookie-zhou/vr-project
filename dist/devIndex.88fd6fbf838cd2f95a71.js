webpackJsonp([10],{1:function(t,e){},17:function(t,e,a){"use strict";(function(t){a(1),a(0),a(2),a(18);var e=a(3);t(document).ready(function(){function a(){n=localStorage.getItem("userName"),o=localStorage.getItem("userType"),t(".user-name").text(n),o&&0!=o||(window.location.href="./index.html")}function s(e){e.forEach(function(e,a){var s;if(e.list){s='<li class="have-list have-list'+a+'">\n                <span value="'+e.typeId+'">'+e.typeName+"</span>\n                </li>",t(s).appendTo(".nav-list");t('<div class="list-unstyled small-box small-box'+a+'"></div>').appendTo(".have-list"+a),e.list.forEach(function(e){var s='\n                    <p value="'+e.typeId+'">'+e.typeName+"</p>\n                    ";t(s).appendTo(".small-box"+a)})}else s='<li>\n                <span value="'+e.typeId+'">'+e.typeName+"</span>\n                </li>",t(s).appendTo(".nav-list")})}(0,e.checkLoginStatus)(),Object.defineProperty(e.loginStatus,"status",{set:function(){a()}}),e.loginStatus.status="";var n=void 0,o=void 0;localStorage.setItem("modelOrProduct","02"),t(".index-page").click(function(){t("iframe").attr("src","/rankingList.html")}),function(){t.ajax({url:"/searchinfoCTL",type:"post",dataType:"json",contentType:"application/json; charset=utf-8",data:JSON.stringify({method:"search_getmostname",type:"02"}),success:function(e){e.map(function(e){t('\n                    <li>\n                            <span class="font-12">'+e+"</span>\n                        </li>\n                    ").appendTo(".keywords")})}})}(),t(".keywords").on("click","li",function(){t(".search-keyword").val(t(this).children().text())}),t(".search-btn").click(function(){t("iframe").attr("src","/searchList.html"),localStorage.setItem("search-name",t(".search-keyword").val())}),function(){t.ajax({url:"/modelTypeCTL",type:"post",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"modeltype_getall"}),success:function(e){s(e),setTimeout(function(){t(".nav-list").on("click","li",function(){localStorage.setItem("vr-name",t(this).find("span").html()),localStorage.setItem("vr-type",t(this).find("span").attr("value")),"首页"==t(this).find("span").html()?t("iframe").attr("src","/rankingList.html"):t("iframe").attr("src","/classifyList.html")}),t(".small-box").on("click","p",function(e){e.stopPropagation(),localStorage.setItem("vr-name",t(this).html()),localStorage.setItem("vr-type",t(this).attr("value")),t("iframe").attr("src","/classifyList.html")}),t(".have-list").mouseover(function(){t(this).find(".small-box").show()}),t(".have-list").mouseleave(function(){t(this).find(".small-box").hide()})},500)}})}(),t(".first-li").mouseover(function(){t(".detail1").css({left:"-228px"})}),t(".first-li").mouseleave(function(){t(".detail1").css({left:"0"})}),t(".second-li").mouseover(function(){t(".detail2").css({left:"-228px"})}),t(".second-li").mouseleave(function(){t(".detail2").css({left:"0"})}),t(".top-btn").click(function(){window.scrollTo(0,0)})})}).call(e,a(0))},18:function(t,e){},2:function(t,e){},3:function(t,e,a){"use strict";(function(t){function s(){t.ajax({url:"/userCTL",type:"post",dataType:"json",contentType:"application/json; charset=utf-8",data:JSON.stringify({method:" isLogin"}),success:function(t){"false"!=t.result?(localStorage.setItem("userName",t.result.username),localStorage.setItem("userType",t.result.usertype),o.status=t.result.usertype):(localStorage.removeItem("userName"),localStorage.removeItem("userType"),o.status="")},error:function(){localStorage.removeItem("userName"),localStorage.removeItem("userType"),o.status=""}})}function n(){var e=t(".content").height();t("iframe",parent.document).css("height",e)}Object.defineProperty(e,"__esModule",{value:!0}),e.setIframeHeight=e.loginStatus=e.checkLoginStatus=void 0,a(0);var o={status:""};e.checkLoginStatus=s,e.loginStatus=o,e.setIframeHeight=n}).call(e,a(0))}},[17]);