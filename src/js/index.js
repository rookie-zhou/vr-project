import 'bootcss';
import "jquery";
import './../css/style.css';
import './../css/index.css';

$(function () {
    // 点击关键词搜索
    $('.keywords').on('click', 'li', function () {
        $('.search-keyword').val($(this).children().text());
    });
})