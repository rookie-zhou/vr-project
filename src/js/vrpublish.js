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
    const userName = localStorage.getItem('userName');
    var postParams = {
        name: '',
        type: '',
        username: userName,
        intro: '',
        softsize: '',
        method: 'vrproduct_publish',
        videourl: '',
        demourl: '',
        imglist: []
    };
    var imgPushUrl = '';
    var filePushUrl = '';
    var imgName = '';
    var token;
    var domain = '';
    var sizeReg = /^[1-9]\d*(\.\d+)?$/i;
    $('.soft-size').bind('input propertychange', function () {
        if (!sizeReg.test($(this).val())) {
            window.parent.showAlertParent('请输入大于0的数字');
            document.getElementsByClassName('soft-size')[0].value = '';
        }
    });
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
                    window.parent.showAlertParent('获取上传凭证失败')
                }
            },
            error: function () {
                window.parent.showAlertParent('获取上传凭证失败')
            }
        });
        $.ajax({
            url: '/productTypeCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                method: 'producttype_getall'
            }),
            success: function (res) {
                if (res.length > 0) {
                    res.map(item => {
                        var navDom;
                        navDom = `<option value="${item.typeId}" style="background: #00ccff">
                            ${item.typeName}
                            </option>`
                        $(navDom).appendTo('.product-type');
                        if (item.child_type.length > 0) {
                            item.child_type.map(value => {
                                var navDomSmall;
                                navDomSmall = `<option value="${value.typeId}">
                            ${value.typeName}
                            </option>`
                                $(navDomSmall).appendTo('.product-type');
                            })
                        }
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
                window.parent.showAlertParent('获取domain失败')
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
                window.parent.showAlertParent('获取限制文件大小及格式失败')
            }
        });
    })();

    // 切换产品类型



    // 获取文件名
    function getFileName(type, fullName, file) {
        var index1 = fullName.lastIndexOf(".");
        var index2 = fullName.length;
        var expandedname = fullName.substring(index1 + 1, index2);
        if (type == 'video') {
            if (!fileLimit.filetype_video.includes(expandedname)) {
                const typeList = fileLimit.filetype_video.toString()
                window.parent.showAlertParent(`请选择正确的视频格式进行上传！（扩展名为：${typeList}的视频）`);
                return;
            }
        } else if (type == 'vrdemo') {
            if (!fileLimit.filetype_demo.includes(expandedname)) {
                const typeList = fileLimit.filetype_demo.toString()
                window.parent.showAlertParent(`请选择正确的DEMO格式进行上传！（扩展名为：${typeList}的视频）`);
                return;
            }
        }
        var data = {
            method: 'getQiniuUpFilename',
            type: type,
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
                    if (type == 'video') {
                        postParams.videourl = res.filename
                        $(".video-name").html(postParams.videourl);
                    } else {
                        postParams.demourl = res.filename
                        $(".demo-name").html(res.filename);
                    }
                    resolve(res.filename);
                },
                error: function () {
                    window.parent.showAlertParent('获取文件名错误，将不能进行上传文件操作！')
                }
            });
        });
        return promiseFun;
    }

    // 上传视频
    $('.video-file').on('change', function (e) {
        const file = e.target.files[0];
        const filePath = $(this).val();
        if (file.size - (parseInt(fileLimit.filesize_video) * 1024 * 1024) > 0) {
            window.parent.showAlertParent('请选择小于' + fileLimit.filesize_video + '的文件！');
        } else {
            const arr = filePath.split('\\');
            const fileName = arr[arr.length - 1];
            getFileName('video', fileName, file).then((res) => {
                uploadFile(file, token, res);
            })
        }

    });
    // 上传软件
    $('.demo-file').on('change', function (e) {
        const file = e.target.files[0];
        if (file.size > parseInt(fileLimit.filesize_demo) * 1024 * 1024) {
            window.parent.showAlertParent('请选择小于' + fileLimit.filesize_demo + '的文件！')
            return;
        }
        const filePath = $(this).val();
        const arr = filePath.split('\\');
        const fileName = arr[arr.length - 1];
        getFileName('vrdemo', fileName, file).then((res) => {
            uploadFile(file, token, res);
        })
    });

    // 上传视频和文件的方法
    function uploadFile(fileSource, token, fileUrl) {
        window.parent.openModal();
        const uptoken = token;
        const file = fileSource;
        const key = fileUrl;
        let observable = qiniu.upload(file, key, uptoken);
        observable.subscribe({
            next: (res) => {
                // 主要用来展示进度
                let total = res.total;
                $('.percent', parent.document).html(parseInt(total.percent));
                setInterval(function closeAll() {
                    if (parseInt(total.percent) == 100) {
                        window.parent.closeModal();
                        clearInterval(closeAll);
                    }
                }, 1000)
            },
            error: (err) => {
                // 失败报错信息
                console.log(err)
            },
            complete: (res) => {
                // 接收成功后返回的信息
                window.parent.closeModal();
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
            const ImgTypeList = fileLimit.filetype_img.toString()
            window.parent.showAlertParent(`请选择正确的图片格式进行上传！（扩展名为：${ImgTypeList}的图片）`);
            return;
        }
        var data = {
            method: 'getQiniuUpFilename',
            type: 'imgvr',
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
                    resolve(res.filename);
                },
                error: function () {
                    window.parent.showAlertParent('获取文件名错误，将不能进行上传文件操作！')
                }
            });
        });
        return promiseFun;
    }

    // 上传图片
    $('.photo-file').on('change', function (e) {
        var file = e.target.files[0];
        if (file.size > parseInt(fileLimit.filesize_img) * 1024 * 1024) {
            window.parent.showAlertParent('请选择小于' + fileLimit.filesize_img + '的图片！')
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
        getImgName(filePath).then((res) => {
            uploadImg(blob, token, res);
        });
    });


    // 上传图片方法
    function uploadImg(imgSource, token, imgUrl) {
        window.parent.openModal();
        const uptoken = token;
        const file = imgSource;
        const key = imgUrl;
        let observable = qiniu.upload(file, key, uptoken);
        observable.subscribe({
            next: (res) => {
                // 主要用来展示进度
                let total = res.total;
                $('.percent', parent.document).html(parseInt(total.percent));
                setInterval(function closeAll() {
                    if (parseInt(total.percent) == 100) {
                        window.parent.closeModal();
                        clearInterval(clearAll);
                    }
                }, 1000)
            },
            error: (err) => {
                // 失败报错信息
                console.log(err)
            },
            complete: (res) => {
                // 接收成功后返回的信息
                window.parent.closeModal();
                var thisImg = {
                    imageName: '',
                    imageurl: '',
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
        console.log(domain + imageUrl);
        var dom = `
        <li>
            <span>${imgName}</span>
            <img src="${domain + imageUrl}" width="100">
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
            window.parent.showAlertParent('当前图片为首页显示图片不能删除！');
            return;
        }
    });
    // 保存
    $('.post-btn').click(function () {
        if (postParams.imglist.length == 0) {
            window.parent.showAlertParent('请上传至少一张图片！');
            return;
        }
        checkIsHomeImg();
        if (!$('.vr-name').val()) {
            window.parent.showAlertParent('请输入VR产品名称');
            return;
        }
        postParams.name = $('.vr-name').val();

        if (!$('.soft-size').val()) {
            window.parent.showAlertParent('请输入软件大小（KB）');
            return;
        }
        postParams.softsize = $('.soft-size').val();

        if (!$(".product-type option:selected").val()) {
            window.parent.showAlertParent('请输入产品类型');
            return;
        }
        postParams.type = $(".product-type option:selected").val();

        if (!postParams.demourl) {
            window.parent.showAlertParent('请上传demo文件');
            return;
        }
        if (!postParams.videourl) {
            window.parent.showAlertParent('请上传演示视频');
            return;
        }
        if (!$('.demo-detail').val()) {
            window.parent.showAlertParent('请输入产品概述');
            return;
        }
        postParams.intro = $('.demo-detail').val();

        $.ajax({
            url: '/vrproductCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(postParams),
            success: function (res) {
                if (res.result == 'true' || res.result == true) {
                    clearAll();
                    window.parent.showAlertParent('发布成功，请等待管理员审核后将自动展示在平台！');
                } else {
                    window.parent.showAlertParent('发布失败！');
                }
            },
            error: function (res) {
                window.parent.showAlertParent('发布失败！');
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
    // 清空数据
    function clearAll() {
        postParams = {
            name: '',
            type: '',
            username: userName,
            intro: '',
            softsize: '',
            method: 'vrproduct_publish',
            videourl: '',
            demourl: '',
            imglist: []
        };
        $('.vr-name').val('');
        $('.soft-size').val('');
        $(".product-type").val('');
        $('.video-name').html('');
        $('.demo-name').html('');
        $('.demo-detail').val('');
        $('ul').empty();
    }
});