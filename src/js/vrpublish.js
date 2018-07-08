import "jquery";
import "bootcss";
import "../css/style.css";
import './../css/vrpublish.css';
$(function () {
    // 上传视频
    $('.video-file').on('change', function () {
        const filePath = $(this).val();
        if (filePath.indexOf('mp4') != -1) {
            const arr = filePath.split('\\');
            const fileName = arr[arr.length - 1];
            $(".video-name").html(fileName);
        } else {
            $(".video-name").html('请选择MP4文件');
        }
    })
    // 上传demo
    $('.demo-file').on('change', function () {
        const filePath = $(this).val();
        const arr = filePath.split('\\');
        const fileName = arr[arr.length - 1];
        $(".demo-name").html(fileName);
    })
})