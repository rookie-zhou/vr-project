import "jquery";
import "bootcss";
import "../css/style.css";
import './../css/vrModelPublish.css';
import * as qiniu from './lib/qiniu.min.js';
import {
    setIframeHeight,
    dataURItoBlob
} from './util';
$(document).ready(function () {
    var fileLimit = {
        filesize_demo: '',
        filesize_img: '',
        filesize_model: '',
        filesize_video: '',
        filetype_demo: [],
        filetype_img: [],
        filetype_model: [],
        filetype_video: []
    }
    setIframeHeight();
    const userName = localStorage.getItem('userName');
    var postParams = {
        name: '',
        type: '',
        username: userName,
        intro: '',
        softsize: '',
        price: '',
        method: 'model_publish',
        modelurl: '',
        imglist: []
    };
    var imgPushUrl = '';
    var imgName = '';
    var domain = '';
    var token;

    // 获取上传token
    (function getQiniuToken() {
        $.ajax({
            url: '/qiniuCTL',
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
        $.ajax({
            url: '/modelTypeCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'modeltype_getall'
            }),
            success: function (res) {
                if (res.length > 0) {
                    res.map(item => {
                        var navDom;
                        navDom = `<option value="${item.typeId}">
                            ${item.typeName}
                            </option>`
                        $(navDom).appendTo('.model-type');
                    });
                }
            }
        });
        // 获取domain
        $.ajax({
            url: '/publicCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'getQiniuDomain'
            }),
            success: function (res) {
                domain = 'http://' + res.domain;
            },
            error: function () {
                alert('获取domain失败')
            }
        });

        // 获取限制文件大小及格式
        $.ajax({
            url: '/publicCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'getfile_sizeandtype'
            }),
            success: function (res) {
                fileLimit = res;
            },
            error: function () {
                alert('获取限制文件大小及格式失败')
            }
        });
    })();



    // 获取文件名
    function getFileName(type, fullName) {
        var index1 = fullName.lastIndexOf(".");
        var index2 = fullName.length;
        var expandedname = fullName.substring(index1 + 1, index2);
        if (!fileLimit.filetype_model.includes(expandedname)) {
            alert('请选择正确的模型格式进行上传！');
            return;
        }
        var data = {
            method: 'getQiniuUpFilename',
            type: type,
            expandedname: expandedname
        }
        $.ajax({
            url: '/qiniuCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function (res) {
                postParams.modelurl = res.filename;
            },
            error: function () {
                alert('获取文件名错误！')
            }
        });
    }

    // 上传模型
    $('.demo-file').on('change', function (e) {
        const file = e.target.files[0];
        if (file.sise > parseInt(fileLimit.filesize_model) * 1024 * 1024) {
            alert('请选择小于' + fileLimit.filesize_model + '的文件！')
            return;
        }
        const filePath = $(this).val();
        const arr = filePath.split('\\');
        const fileName = arr[arr.length - 1];
        $(".demo-name").html(fileName);
        getFileName('model', filePath);
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
        if (!fileLimit.filetype_img.includes(expandedname)) {
            alert('请选择正确的图片格式进行上传！');
            return;
        }
        var data = {
            method: 'getQiniuUpFilename',
            type: 'imgmodel',
            expandedname: expandedname
        }
        var promiseFun = new Promise((resolve, reject) => {
            $.ajax({
                url: '/qiniuCTL',
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
        if (file.sise > parseInt(fileLimit.filesize_img) * 1024 * 1024) {
            alert('请选择小于' + fileLimit.filesize_img + '的图片！')
            return;
        }
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
        getImgName(filePath).then(() => {
            uploadImg(blob, token);
        });
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
                addImg(imgPushUrl);
                postParams.imglist.push(thisImg);
            }
        });
    };

    function addImg(imageUrl) {
        var index = postParams.imglist.length;
        var checked = '';
        if (index == 0) {
            checked = 'checked';
        }
        var dom = `
        <li>
            <span>${imgName}</span>
            <img src="${domain+'/'+imageUrl}" width="100">
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
            return;
        }
    });
    // 保存
    $('.post-btn').click(function () {
        if (postParams.imglist.length == 0) {
            alert('请上传至少一张图片！');
            return;
        }
        checkIsHomeImg();
        console.log(postParams);
        if (!$('.vr-name').val()) {
            alert('请输入VR产品名称');
            return;
        }
        postParams.name = $('.vr-name').val();

        if (!$(".price").val()) {
            alert('请输入模型价格！');
            return;
        }
        postParams.price = $('.price').val();

        if (!$(".size").val()) {
            alert('请输入软件大小（KB）！');
            return;
        }
        postParams.softsize = $('.size').val();

        if (!$(".model-type option:selected").val()) {
            alert('请输入产品类型');
            return;
        }
        postParams.type = $(".model-type option:selected").val();

        if (!postParams.modelurl) {
            alert('请上传demo文件');
            return;
        }
        if (!$('.demo-detail').val()) {
            alert('请输入产品概述');
            return;
        }
        postParams.intro = $('.demo-detail').val();

        $.ajax({
            url: '/modelCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(postParams),
            success: function (res) {
                if (res == 'true') {
                    alert('发布成功，请等待管理员审核后将自动展示在平台！');
                } else {
                    alert('发布失败！');
                }
            },
            error: function (res) {
                alert('发布失败！');
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
    // 动态设置iframe高度
    setIframeHeight();
});