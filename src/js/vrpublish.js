import "jquery";
import "bootcss";
import "../css/style.css";
import './../css/vrpublish.css';
import * as qiniu from './lib/qiniu.min.js';
import {
    dataURItoBlob
} from './util';
$(document).ready(function () {
    var postParams = {
        name: '',
        type: '',
        userName: '',
        intro: '',
        softsize: '',
        method: 'vrproduct_publish',
        videourl: '',
        demourl: '',
        imglist: []
    }

    var token = '';
    // var token = 'FQ_7Dfy-FIiwm8BIAfdXnOatB2Tj9qJMIWtykdXG:p-E5-HDd7hDSysIyC7gkQ7MIi3c=:eyJzY29wZSI6InZ2d29rLWxpYW56aHVrZWppIiwiZGVhZGxpbmUiOjE1MzUzMjc2ODF9';
    // 获取上传token
    (function getQiniuToken() {
        $.ajax({
            url: '/api/qiniuCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: 'getQiniuUptoken'
            }),
            success: function (res) {
                if (res.uptoken) {
                    token = res.uptoken;
                    return token;
                } else {
                    alert('获取上传凭证失败')
                }
            },
            error: function () {
                alert('获取上传凭证失败')
            }
        });
    })();

    // 获取文件名
    function getFileName(type, fullName) {
        var index1 = fullName.lastIndexOf(".");
        var index2 = fullName.length;
        var expandedname = fullName.substring(index1 + 1, index2);
        var data = {
            method: 'getQiniuUpFilename',
            type: type,
            expandedname: expandedname
        }
        $.ajax({
            url: '/api/qiniuCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (res) {
                // console.log(res)
            },
            error: function () {

            }
        });
    }

    // 上传视频
    $('.video-file').on('change', function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var dataURL = reader.result;
            var blob = dataURItoBlob(dataURL);
            uploadImg(blob, token);
        };

        const filePath = $(this).val();
        getFileName('imgvr', filePath);
        if (filePath.indexOf('mp4') != -1) {
            const arr = filePath.split('\\');
            const fileName = arr[arr.length - 1];
            $(".video-name").html(fileName);
        } else {
            $(".video-name").html('请选择MP4文件');
        }
    });
    // 上传demo
    $('.demo-file').on('change', function () {
        const filePath = $(this).val();
        const arr = filePath.split('\\');
        const fileName = arr[arr.length - 1];
        $(".demo-name").html(fileName);
    });


    function uploadImg(imgSource, token) {
        const uptoken = token;
        const file = imgSource;
        const key = null;
        let observable = qiniu.upload(file, key, uptoken);
        observable.subscribe({
            next: (res) => {
                // 主要用来展示进度
                console.log(res)
                let total = res.total;
                console.log("进度：" + parseInt(total.percent) + "% ")
            },
            error: (err) => {
                // 失败报错信息
                console.log(err)
            },
            complete: (res) => {
                // 接收成功后返回的信息
                // window.Qapp.hideLoad()
                console.log(res)
                qiniu.imageInfo(res.key, domain).then(res => {
                    console.log(res)
                })
            }

        })
    };
    // 保存
    $('.post-btn').click(function () {
        $.ajax({
            url: '/api/vrproductCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(postParams),
            success: function (res) {
                console.log(res)
            },
            error: function () {

            }
        });
    })
})