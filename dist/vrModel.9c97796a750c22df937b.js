webpackJsonp([12],{1:function(t,e){},2:function(t,e){},33:function(t,e,n){"use strict";(function(t){n(1),n(0),n(2),n(34),t(document).ready(function(){function e(e){t(".title").text(e.name),t(".price-num").text(e.price),t(".downamount").text(e.downamount),t(".softsize").text(e.softsize),t(".collection").text(e.collection),t(".date").text(new Date(e.publishtime.time).toLocaleString()),t(".lookcount").text(e.lookcount),t(".praise").text(e.praise),t(".text-intro").text(e.intro),e.image.length>0?e.image.map(function(e){var n='\n                    <img src="'+e.imageUrl+'" alt="'+e.imageName+'">\n                ';t(n).appendTo(".img-box")}):t(".img-detail").hide(),t(".home-img").attr("src",e.homeImage).attr("alt",e.name)}var n=function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}("id");t.ajax({type:"post",url:"/modelCTL",dataType:"json",contentType:"application/json",data:JSON.stringify({method:"model_detailed",modelid:n}),success:function(t){e(t)}})})}).call(e,n(0))},34:function(t,e){}},[33]);