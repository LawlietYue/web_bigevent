$(function () {
    // 为layui 注册规则
    layui.form.verify({
        nickname: [/^\S{4,8}$/, '昵称必须在4-8个字符之间']
    });

    //加载用户基本信息
    initUserInfo()

    // 重置按钮事件
    $('#btnReset').on('click', function (e) {
        e.preventDefault();//阻断表单默认行为

        initUserInfo()

    })

    //表单提交事件
    $('.layui-form').on('submit', submitData)
})
//加载用户基本信息--- 
function initUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success(res) {
            console.log(res);
            if (res.status != 0) return layui.layer.msg(res.message);
            layui.form.val('userForm', res.data)
        }
    })
}

//提交表单数据
function submitData(e) {
    e.preventDefault();//阻断表单默认行为

    $.ajax({
        url: '/my/userinfo',
        method: 'post',
        data: $(this).serialize(),
        success(res) {
            //不管成功失败都显示提示消息
            layui.layer.msg(res.message)

            //    如果错停止 函数执行
            if (res.status != 0) return
            //如果没有出错 则通过window.parent 或 window.top调用父页面的方法
            window.top.getUserInfo()
        }
    })
}