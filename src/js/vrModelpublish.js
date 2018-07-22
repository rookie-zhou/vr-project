import "jquery";
import "bootcss";
import "../css/style.css";
import './../css/vrModelPublish.css';
$(document).ready(function () {
    // 关闭浏览器 删除localstorage
    // window.onbeforeunload = function () {
    //     localStorage.setItem('userName', '');
    //     localStorage.setItem('userType', '');
    // };
    // 上传demo
    $('.demo-file').on('change', function () {
        const filePath = $(this).val();
        const arr = filePath.split('\\');
        const fileName = arr[arr.length - 1];
        $(".demo-name").html(fileName);
    })
})