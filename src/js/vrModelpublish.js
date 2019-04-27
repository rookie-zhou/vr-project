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
        modelurl: '/api',
        imglist: []
    };
    var imgPushUrl = '';
    var imgName = '';
    var domain = '';
    var token;
    var sizeReg = /^[1-9]\d*(\.\d+)?$/i;

    $('.size').bind('input propertychange', function () {
        if (!sizeReg.test($(this).val())) {
            window.parent.showAlertParent('请输入大于0的数字');
            document.getElementsByClassName('size')[0].value = '';
        }
    });
    $('.price').bind('input propertychange', function () {
        if (!sizeReg.test($(this).val())) {
            window.parent.showAlertParent('请输入大于0的数字');
            document.getElementsByClassName('price')[0].value = '';
        }
    });

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
                    window.parent.showAlertParent('获取上传凭证失败')
                }
            },
            error: function () {
                window.parent.showAlertParent('获取上传凭证失败')
            }
        });
        $.ajax({
            url: '/api/modelTypeCTL',
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
                        navDom = `<option value="${item.typeId}" style="background: #00ccff">
                            ${item.typeName}
                            </option>`
                        $(navDom).appendTo('.model-type');
                        if (item.child_type.length > 0) {
                            item.child_type.map(value => {
                                var navDomSmall;
                                navDomSmall = `<option value="${value.typeId}">
                            ${value.typeName}
                            </option>`
                                $(navDomSmall).appendTo('.model-type');
                            })
                        }
                    });
                }
            }
        });
        // 获取domain
        $.ajax({
            url: '/api/publicCTL',
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
            url: '/api/publicCTL',
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
        // 获取以人民币等于多少维币
        $.ajax({
            url: '/api/publicCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify({
                method: ' RMB_VRMONEY'
            }),
            success: function (res) {
                // coefficient = res.RMB_VRMONEY;
                $('.money-wb').html(res.RMB_VRMONEY)
            }
        });
    })();



    // 获取文件名
    function getFileName(type, fullName) {
        var index1 = fullName.lastIndexOf(".");
        var index2 = fullName.length;
        var expandedname = fullName.substring(index1 + 1, index2);
        if (!fileLimit.filetype_model.includes(expandedname)) {
            const modelTypeList = fileLimit.filetype_model.toString()
            window.parent.showAlertParent(`请选择正确的模型格式进行上传！(扩展名为：${modelTypeList}的文件)`);
            return;
        }
        var data = {
            method: 'getQiniuUpFilename',
            type: type,
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
                    postParams.modelurl = res.filename;
                    $(".demo-name").html(res.filename);
                    resolve(res.filename)
                },
                error: function () {
                    window.parent.showAlertParent('获取文件名错误！')
                }
            });
        })
        return promiseFun;
    }

    // 上传模型
    $('.demo-file').on('change', function (e) {
        const file = e.target.files[0];
        if (file.size > parseInt(fileLimit.filesize_model) * 1024 * 1024) {
            window.parent.showAlertParent('请选择小于' + fileLimit.filesize_model + '的文件！')
            return;
        }
        const filePath = $(this).val();
        const arr = filePath.split('\\');
        const fileName = arr[arr.length - 1];
        getFileName('model', filePath).then((res) => {
            uploadFile(file, token, res);
        });
    });

    // 上传视频和文件的方法
    function uploadFile(imgSource, token, fileUrl) {
        window.parent.openModal();
        const uptoken = token;
        const file = imgSource;
        const key = fileUrl;
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
            type: 'imgmodel',
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
                    window.parent.showAlertParent('获取文件名错误！')
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
            console.log(res)
            uploadImg(blob, token,res);
        });
    });


    // 上传图片方法
    function uploadImg(imgSource, token,filename) {
        window.parent.openModal();
        const uptoken = token;
        const file = imgSource;
        const key = filename;
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
                var thisImg = {
                    imageName: '',
                    imageurl: '/api',
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

        if (!$(".price").val()) {
            window.parent.showAlertParent('请输入模型价格！');
            return;
        }
        postParams.price = $('.price').val();

        if (!$(".size").val()) {
            window.parent.showAlertParent('请输入软件大小（KB）！');
            return;
        }
        postParams.softsize = $('.size').val();

        if (!$(".model-type option:selected").val()) {
            window.parent.showAlertParent('请输入产品类型');
            return;
        }
        postParams.type = $(".model-type option:selected").val();

        if (!postParams.modelurl) {
            window.parent.showAlertParent('请上传ＶＲ模型文件');
            return;
        }
        if (!$('.demo-detail').val()) {
            window.parent.showAlertParent('请输入产品概述');
            return;
        }
        postParams.intro = $('.demo-detail').val();

        $.ajax({
            url: '/api/modelCTL',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(postParams),
            success: function (res) {
                if (res.result == 'true' || res.result == true) {
                    clearAll()
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
            price: '',
            method: 'model_publish',
            modelurl: '/api',
            imglist: []
        };
        $('.vr-name').val('');
        $('.price').val('');
        $(".model-type").val('');
        $('.demo-name').html('');
        $('.size').val('');
        $('.demo-detail').val('');
        $('ul').empty();
    }
});