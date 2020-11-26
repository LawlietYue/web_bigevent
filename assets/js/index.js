$(function () {
    //调用getUserInfo 获取用户信息
    getUserInfo()
    $('#btnLogout').on('click', logout)
})

function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success(res) {
            if (res.status != 0) return layui.layer.msg(res.message)
            renderAvatar(res.data)
            // console.log(res);
        }
    })
}

//渲染用户信息
function renderAvatar(usrData) {
    //现获取用户名(昵称/用户名)
    let usrName = usrData.nickname || usrData.username
    $('#welcome').html(usrName)

    // 渲染头像
    if (usrData.user_pic != null) {
        $('.layui-nav-img').attr('src', usrData.user_pic).show()
        // 隐藏文字头像
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()//隐藏图片头像
        let firstChar = usrName[0].toUpperCase()//获取名字首字
        $('.text-avatar').text(firstChar).show()//设置文字并显示
    }

}

function logout() {
    layui.layer.confirm('你想清楚了兄弟?确定要退?', { icon: 3, title: '系统提示' }, function (index) {
        //删除 localStorage中的 token值
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
    });
}