// 为页面上所有基于jq 的jaax请求的发送之前 对参数对象做处理
$.ajaxPrefilter(function (ajaxOpt) {
    // console.log(ajaxOpt);
    ajaxOpt.url = 'http://ajax.frontend.itheima.net' + ajaxOpt.url;
    //为所有/my/请求添加 token
    if (ajaxOpt.url.indexOf('/my/') > -1) {
        ajaxOpt.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //为所有的ajax请求 统一配置complete事件函数

    ajaxOpt.complete = function (res) {
        // console.log(res);
        // console.log(res.responseJSON);
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            // 清空token
            layer.msg(res.responseJSON.message, {
                icon: 1,
                time: 1500 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
                // 清空token
                localStorage.removeItem('token')
                // 跳转到login.html
                location.href = "/login.html"
            });

        }
    }
});