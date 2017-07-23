$(function() {
    /* 鼠标移动绘制路线 */
    function drawLine(){

    }

    /* 切换颜色 */
    function changeColor(){

    }

    /* 切换线条粗细 */
    function lineSize(){

    }

    /* 清除画板 */
    function clearPanel(){

    }

    /* IE浏览器兼容性 */
    var canvasDiv = document.getElementById('canvasDiv'),
        canvas = document.createElement('canvas');
    canvas.setAttribute('style', 'width:100%;height:4rem;');
    canvas.setAttribute('id', 'canvasBox');
    canvasDiv.appendChild(canvas);
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    contextDiv = canvas.getContext("2d");
})