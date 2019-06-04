import "jquery";
import './lib/remodal/remodal.css';
import './lib/remodal/remodal-default-theme.css';
import './lib/remodal/remodal.min.js';
var loginStatus = {
    status: ''
}

function checkLoginStatus() {
    $.ajax({
        url: '/userCTL',
        type: 'post',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            method: ' isLogin'
        }),
        success: function (res) {
            if (res.result != 'false') {
                localStorage.setItem('userName', res.result.username);
                localStorage.setItem('userType', res.result.usertype);
                loginStatus.status = res.result.usertype;
            } else {
                localStorage.removeItem('userName');
                localStorage.removeItem('userType');
                loginStatus.status = '';
            }
        },
        error: function () {
            localStorage.removeItem('userName');
            localStorage.removeItem('userType');
            loginStatus.status = '';
        }
    });
}
// 设置iframe 高度
function setIframeHeight() {
    setTimeout(function () {
        var divHeight = $('.content').height();
        $('iframe', parent.document).css('height', divHeight + 100);
    }, 300);
}

// 时间戳转yyyy-MM-dd
function fmtDate(obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}


function dataURItoBlob(base64Data) {
    var byteString;
    if (base64Data.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(base64Data.split(',')[1]);
    else
        byteString = unescape(base64Data.split(',')[1]);
    var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
        type: mimeString
    });
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function showAlertMsg(content) {
    if (document.getElementsByClassName('alertMsgModal')[0] == undefined) {
        const alertMsgModalDom = `
        <div class="alertMsgModal" data-remodal-id="alertMsgModal">
            <p class="showAlert-msg">
                ${content}
            </p>
            <br>
            <button data-remodal-action="confirm" class="remodal-confirm">确认</button>
        </div>
    `
        $(alertMsgModalDom).appendTo($('body'));
    }else {
        window.parent.document.getElementsByClassName('showAlert-msg')[0].innerHTML = content
    }
    var alertMsgModal = $('[data-remodal-id=alertMsgModal]').remodal();
    alertMsgModal.open();
}


export {
    checkLoginStatus,
    loginStatus,
    setIframeHeight,
    fmtDate,
    dataURItoBlob,
    GetQueryString,
    showAlertMsg
}