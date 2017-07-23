$(function() {
    /* 鼠标移动绘制路线 */
    function drawLine() {

    }

    /* 切换颜色 */
    function changeColor() {

    }

    /* 切换线条粗细 */
    function lineSize() {

    }

    /* 清除画板 */
    function clearPanel() {

    }

    /* IE浏览器兼容性 */
    var canvasDiv = document.getElementById('canvasDiv'),
        canvas = document.createElement('canvas');
    canvas.setAttribute('style', 'width:100%;height:4rem;border:1px solid #838383;margin:.3rem 0;');
    canvas.setAttribute('id', 'canvas');
    canvasDiv.appendChild(canvas);

    /* 利用excanvas.js专门为IE扩展的canvas元素包中提供的处理方法initElement进行相应处理 */
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }

    /* 获取绘图上下文 */
    context = canvas.getContext("2d");

    /* 鼠标按下事件 */
    $('#canvas').mousedown(function(e) {
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        /* 设置标志量，paint为true时，表明当前正在绘制图形，paint为false时，表示鼠标已经松开 */
        paint = true;
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
        redraw();
    });

    /* 鼠标移动事件 */
    $(#canvas).mousemove(function(e) {
        /* 判断是否按下鼠标 */
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }　
    });

    /* 鼠标松开事件--设置标志量paint为false */
    $(#canvas).mouseup(function(e) {
        paint = false;
    });

    /* 鼠标移开事件--设置标志量paint为false */
    $('#canvas').mouseleave(function(e) {
        paint = false;
    });
})