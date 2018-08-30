import "jquery";
import "bootcss";
import "../css/style.css";
import './../css/vrpublish.css';
import * as qiniu from './lib/qiniu.min.js';
import {
    setIframeHeight,
    dataURItoBlob
} from './util';
$(document).ready(function () {
    setIframeHeight();
    const userName = localStorage.getItem('userName');
    var postParams = {
        name: '',
        type: '',
        userName: userName,
        intro: '',
        softsize: '',
        method: 'vrproduct_publish',
        videourl: '',
        demourl: '',
        imglist: []
    };
    var imgPushUrl = '';
    var imgName = '';
    var token;
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
                if (type == 'video') {
                    postParams.videourl = res.filename;
                } else if (type == 'vrdemo') {
                    postParams.demourl = res.filename;
                }
            },
            error: function () {
                alert('获取文件名错误！')
            }
        });
    }

    // 上传视频
    $('.video-file').on('change', function (e) {
        const file = e.target.files[0];
        const filePath = $(this).val();
        if (filePath.indexOf('mp4') != -1) {
            const arr = filePath.split('\\');
            const fileName = arr[arr.length - 1];
            $(".video-name").html(fileName);
            getFileName('video', filePath);
            uploadFile(file, token);
        } else {
            $(".video-name").html('请选择MP4文件');
        }
    });
    // 上传软件
    $('.demo-file').on('change', function (e) {
        const file = e.target.files[0];
        const filePath = $(this).val();
        const arr = filePath.split('\\');
        const fileName = arr[arr.length - 1];
        $(".demo-name").html(fileName);
        getFileName('vrdemo', filePath);
        uploadFile(file, token);
    });

    // 上传视频和文件的方法
    function uploadFile(imgSource, token) {
        window.parent.openModal();
        const uptoken = token;
        const file = imgSource;
        const key = null;
        let observable = qiniu.upload(file, key, uptoken);
        observable.subscribe({
            next: (res) => {
                // 主要用来展示进度
                let total = res.total;
                $('.percent', parent.document).html(parseInt(total.percent));
                if (parseInt(total.percent) == 100) {
                    window.parent.closeModal();
                }
            },
            error: (err) => {
                // 失败报错信息
                console.log(err)
            },
            complete: (res) => {
                // 接收成功后返回的信息
                console.log(res)
            }
        });
    };

    // 获取图片文件名
    function getImgName(fullName) {
        var index1 = fullName.lastIndexOf(".");
        var index2 = fullName.length;
        var expandedname = fullName.substring(index1 + 1, index2);
        var data = {
            method: 'getQiniuUpFilename',
            type: 'imgvr',
            expandedname: expandedname
        }
        var promiseFun = new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/qiniuCTL',
                type: 'post',
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',
                data: JSON.stringify(data),
                success: function (res) {
                    imgPushUrl = res.filename;
                    resolve(imgPushUrl);
                },
                error: function () {
                    alert('获取文件名错误！')
                }
            });
        });
        return promiseFun;
    }

    // 上传图片
    $('.photo-file').on('change', function (e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        var blob;
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            var dataURL = reader.result;
            blob = dataURItoBlob(dataURL);
        };
        const filePath = e.target.files[0].name;
        const index = filePath.lastIndexOf(".");
        imgName = filePath.substring(0, index);
        if (filePath.indexOf('png') != -1 || filePath.indexOf('jpg') != -1 || filePath.indexOf('jpeg') != -1) {
            getImgName(filePath).then(() => {
                uploadImg(blob, token);
            });
        } else {
            alert('请选择jpg、jpeg、png格式的图片进行上传！');
        }
    });


    // 上传图片方法
    function uploadImg(imgSource, token) {
        window.parent.openModal();
        const uptoken = token;
        const file = imgSource;
        const key = null;
        let observable = qiniu.upload(file, key, uptoken);
        observable.subscribe({
            next: (res) => {
                // 主要用来展示进度
                let total = res.total;
                $('.percent', parent.document).html(parseInt(total.percent));
                if (parseInt(total.percent) == 100) {
                    setTimeout(() => {
                        window.parent.closeModal();
                    }, 200);
                }
            },
            error: (err) => {
                // 失败报错信息
                console.log(err)
            },
            complete: (res) => {
                // 接收成功后返回的信息
                var thisImg = {
                    imageName: '',
                    imageUrl: '',
                    isHomepage: ''
                }
                thisImg.imageName = imgName;
                thisImg.imageUrl = imgPushUrl;
                if (postParams.imglist.length == 0) {
                    thisImg.isHomepage = 'Y'
                } else {
                    thisImg.isHomepage = 'N'
                }
                addImg();
                postParams.imglist.push(thisImg);
            }
        });
    };

    function addImg() {
        var index = postParams.imglist.length;
        var checked = '';
        if (index == 0) {
            checked = 'checked';
        }
        var dom = `
        <li>
            <span>${imgName}</span>
            <input class="group" id="img-${index}" type="radio" name="type" value="${index}" ${checked}>
            <label class="group" for="img-${index}">是否显示在首页</label>
            <button class="btn del-btn btn-primary" index="${index}">删除</button>
        </li>
        `
        $(dom).appendTo($('ul'));
    }
    // 删除图片
    $('ul').on('click', '.del-btn', function () {
        checkIsHomeImg();
        var index = $(this).attr('index');
        if (postParams.imglist[index].isHomepage == 'N') {
            $(this).closest('li').remove();
            postParams.imglist.splice(index, 1);
        } else {
            alert('当前图片为首页显示图片不能删除！');
            return false;
        }
    });
    // 保存
    $('.post-btn').click(function () {
        if (!$('.vr-name').val()) {
            alert('请输入VR产品名称');
            return false;
        }
        postParams.name = $('.vr-name').val();

        if (!$('.soft-size').val()) {
            alert('请输入软件大小（KB）');
            return false;
        }
        postParams.softsize = $('.soft-size').val();

        if (!$('.product-type').val()) {
            alert('请输入产品类型');
            return false;
        }
        postParams.type = $('.product-type').val();

        if (!postParams.demourl) {
            alert('请上传demo文件');
            return false;
        }
        if (!postParams.videourl) {
            alert('请上传演示视频');
            return false;
        }
        if (!$('.demo-detail').val()) {
            alert('请输入产品概述');
            return false;
        }
        postParams.intro = $('.demo-detail').val();

        if (postParams.imglist.length == 0) {
            alert('请上传至少一张图片！');
            return false;
        }

        checkIsHomeImg();

        $.ajax({
            url: '/api/vrproductCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(postParams),
            success: function (res) {
                console.log(res)
            },
            error: function (res) {
                console.log(res)
            }
        });
    });

    // 检查首页图片
    function checkIsHomeImg() {
        const checkValue = $("input[name='type']:checked").val();
        postParams.imglist.map((item, index) => {
            item.isHomepage = 'N';
            if (checkValue == index) {
                item.isHomepage = 'Y';
            }
        });
    }
});