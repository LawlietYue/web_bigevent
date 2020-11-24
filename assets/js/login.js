$(function () {
    //去注册按钮点击事件
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    // 点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();

    })

    // 从layui中获取 form对象
    layui.form.verify({

        //通过form.verify)=()函数自定义效验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //效验两次密码框的中的内容是否已有
        repwd: function (value) {
            let pwd1 = $('.reg-box [name=password]').val()
            if (pwd1 != value) return '两次密码输入一致'
        }
    })


    //  注册表单提交事件
    $('#regForm').on('submit', submitData)

    // 登录表单提交事件
    $('#formLogin').on('submit', function (e) {
        e.preventDefault();//阻断表单默认行为
        let dataStr = $(this).serialize()
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: dataStr,
            success(res) {
                //登录失败
                if (res.status !== 0) return layui.layer.msg(res.message)

                // 登录成功
                layer.msg(res.message, {
                    icon: 6,
                    time: 1500 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    // 保存token值到 localstorage
                    localStorage.setItem('token', res.token)
                    // 跳转到index.html
                    location.href = '/index.html'

                });
            }
        })
    })

})



// 根路径

// 注册函数
function submitData(e) {
    e.preventDefault();//阻断表单默认行为
    let dataStr = $(this).serialize();
    // console.log(dataStr);

    //  发送异步请求
    $.ajax({
        url: '/api/reguser',
        method: 'post',
        data: dataStr,
        success(res) {
            layui.layer.msg(res.message);
            if (res.status != 0) return

            let uname = $('.reg-box [name=username]').val().trim()
            $('.login-box [name=username]').val(uname)

            let upwd = $('.reg-box [name=password]').val().trim()
            $('.login-box [name=password]').val(upwd)

            // 清空表单注册表
            $('#regForm')[0].reset()

            $('#link_login').click()

        }

    })

}