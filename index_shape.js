$(function() {
    var screenWidth = document.documentElement.clientWidth,
        screenHeight = document.documentElement.clientHeight,
        canvasWidth = screenWidth - 40,
        canvasHeight = screenHeight - 200, //canvas标签的大小变量
        canvasDiv = document.getElementById('canvasDiv'), //canvas容器
        canvas = document.createElement('canvas'); //创建了元素canvas
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas'); //设置画布的id、高度和宽度等属性
    canvasDiv.appendChild(canvas); //为canvasDiv增加了子元素canvas
})