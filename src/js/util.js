import "jquery";
var loginStatus = {
    status: ''
}
function checkLoginStatus() {
    $.ajax({
        url: '/api/userCTL',
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
    var divHeight = $('.content').height();
    $('iframe', parent.document).css('height', divHeight);
}

export {checkLoginStatus, loginStatus, setIframeHeight}

