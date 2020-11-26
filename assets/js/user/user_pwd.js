$(function () {
    //添加表单验证规则
    layui.form.verify({
        pwd: [/^\S{6,12}$/, '密码必须在6-12个字符之间'],
        samepwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '新旧密码不能一样哦'
            }
        },
        confirmpwd: function (value) {
            if (value != $('[name=newPwd]').val()) {
                return '确认密码和新密码不一致'
            }
        }
    })

    //为表单添加提交事件
    $('.layui-form').on('submit', changePwd)
})

//修改密码----
function changePwd(e) {
    e.preventDefault();//阻断表单默认行为
    //提交数据到借口 完成密码更新
    $.ajax({
        url: '/my/updatepwd',
        method: 'post',
        data: $(this).serialize(),
        success(res) {
            // 如果不成功则退出函数
            if (res.status != 0) return layui.layer.msg(res.message)


            layui.layer.msg(res.message, {
                icon: 1,
                time: 1500 //2秒关闭（如果不配置，默认是3秒）
            }, function () {
                // $('.layui-form')[0].reset() 修改后清空表单内容

                localStorage.removeItem('token')
                window.top.location = '/login.html'
            });


        }
    })
}