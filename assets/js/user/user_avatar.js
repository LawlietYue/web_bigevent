$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    // 为上传点击按钮 添加点击事件
    $('#btnUpload').on('click', chooseFile)

    // 为文本选择框绑定 chenghe事件 获取选中文件信息
    $('#file').on('change', fileChange)

    //为确认上传添加点击事件
    // console.log($('#btnOK2').length);
    $('#btnOK').on('click', upload)



    //选择文件
    function chooseFile() {
        $('#file').click()
    }

    function fileChange(e) {
        let fileList = e.target.files;
        if (fileList.length == 0) return layui.layer.msg('请选择文件')

        //获取选中的第一个文件信息对象
        let file = fileList[0]
        var newImgURL = URL.createObjectURL(file)

        //调用 裁剪组件 销毁 之间的图片设置 新的虚拟路径给他 并从新创建裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域

        // console.log(fileList);
    }

    // 确认上传图片
    function upload() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        console.log(dataURL);
        $.ajax({
            url: '/my/update/avatar',
            method: 'post',
            data: {
                avatar: dataURL
            },
            success(res) {
                layui.layer.msg(res.message);

                // 如果失败 则退出函数
                if (res.status != 0) return

                // 如果上传成功 则调用付页面的方法 重新渲染 用户信息
                window.top.getUserInfo()
            }
        })
    }


})



