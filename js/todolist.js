$(function () {
    // 输入框
    var $title = $('#title');
    // 正在进行
    var $todolist = $('#todolist');
    // 完成
    let $donelist = $('#donelist');
    // 正在进行按钮
    var $todocount = $('#todocount');
    // 完成按钮
    var $donecount = $('#donecount');
    var $container = $('.container');


    // 输入框操作
    $title.on('keydown', function (e) {

        if ($(this).val() === '') {
            return;
        }
        if (e.keyCode !== 13) {
            return
        }

        // 将数据保存到本地
        var datas = getDatas()

        // 添加数据
        datas.push({
            content: $(this).val(),
            status: false
        })
        // 存储数据
        localStorage.setItem('todoDatas', JSON.stringify(datas))
        // 清空
        $(this).val('')


        // 根据本地存储进行结构在创建
        createHTML();
    })
    // 界面加载时结构创建防止刷新数据丢失
    createHTML()


    // 添加到已完成操作
    $container.on('click', 'input', function () {
        // 获取本地设置
        var datas = getDatas();
        // 获取自定义索引
        var index = $(this).data('index');
        datas[index].status = $(this).prop('checked')
        // 存储数据
        localStorage.setItem('todoDatas', JSON.stringify(datas))

        // 结构设置
        createHTML()
    })
    // 删除操作
    $container.on('click', 'a', function () {
        var datas = getDatas()
        var index = $(this).data('index');
        datas.splice(index, 1)
        localStorage.setItem('todoDatas', JSON.stringify(datas))
        createHTML()
    })


    // 获取数据保存本地封装
    function getDatas() {
        var datas = localStorage.getItem('todoDatas');
        if (datas !== null) {
            datas = JSON.parse(datas)
        } else {
            datas = [];
        }
        return datas
    }
    // 结构封装
    function createHTML() {
        var datas = getDatas();

        // 清空
        $todolist.empty()
        $donelist.empty()
        $.each(datas, function (i, ele) {
            if (ele.status) {
                $donelist.prepend(
                    `<li>
                    <input type="checkbox" checked="checked" data-index=${i}>
                    <p>${ele.content}</p>
                    <a href="javascript:;" data-index=${i}></a>
                </li>`
                )
            } else {
                $todolist.prepend(
                    `<li>
                        <input type="checkbox" data-index=${i}>
                        <p>${ele.content}</p>\
                        <a href="javascript:;" data-index=${i}></a>
                    </li>`);
            }
        })
        // 计数显示
        $todocount.text($todolist.children().length)
        $donecount.text($donelist.children().length)
    }

})