$(function() {
    var clickX = new Array(), //绘画x轴数据点
        clickY = new Array(), //绘画y轴数据点
        clickDrag = new Array(), //判断是否鼠标松开的标志 
        clickColor = new Array(), //修改绘图颜色
        currentColor = '#000', //默认画笔颜色为黑色
        clickSize = new Array(), //修改绘图画笔粗细
        size = 1, //线条默认size = 1
        clickTool = new Array(), //工具
        curTool = "pencil", //默认工具
        crayonTextureImage = new Image(), //新建图片对象
        paint, //设置绘图标志量，paint为true时，表明当前正在绘制图形，patint为false时，表示鼠标已经松开
        screenWidth=document.documentElement.clientWidth,
        screenHeight=document.documentElement.clientHeight,
        canvasWidth = screenWidth-40,
        canvasHeight = screenHeight-200, //canvas标签的大小变量
        canvasDiv = document.getElementById('canvasDiv'), //canvas容器
        canvas = document.createElement('canvas'); //创建了元素canvas
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas'); //设置画布的id、高度和宽度等属性
    canvasDiv.appendChild(canvas); //为canvasDiv增加了子元素canvas

    /* 设置图片路径 */
    crayonTextureImage.src = "assets/images/crayon-texture.png";

    /* 解决IE浏览器不支持html5 canvas：通过excanvas.js专门为IE扩展的canvas元素包中提供的处理方法initElement进行相应的判断处理 */
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    /* 使用canvas的绘图功能:调用canvas的上下文 */
    context = canvas.getContext("2d");

    /* 清空画板时重新绘制矩形作为canvas容器 */
    function clearCanvas() {
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvasWidth, canvasHeight);
        canvas.width = canvas.width;
    }

    /* 修改画笔颜色 */
    $('.color-choice').on('click', 'span', function() {
        currentColor = $(this).attr('class');
    });
    $('.inputColor').on('change', function() {
        currentColor = $(this).val();
    });

    /* 设置线条粗细 */
    $('.line-size').on('click', 'div.size', function() {
        size = $(this).attr('data-size');
    });
    $('.line-width').on('change', function() {
        size = $(this).val();
    });

    /* 设置画笔工具 */
    $('.draw-tools').on('click', ('a:not(clearCanvas)'), function() {
        curTool = $(this).attr('class');
    });

    /* 绘图形状 */
    $('.line-shape').on('click', 'a', function() {
        shape = $(this).attr('class');
    })

    /* 记录鼠标移动的点 */
    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        /* 判断当前工具是否为橡皮擦 */
        if (curTool == "eraser") {
            clickColor.push("white");
        } else {
            clickColor.push(currentColor);
        }
        clickSize.push(size);
    }

    /* 将已记录的数据点在canvas画布中绘画出来 */
    function redraw() {
        /* 清空画板，然后重新把所有的点都画过 */
        clearCanvas();

        context.lineJoin = "round";
        context.lineWidth = size;
        for (var i = 0; i < clickX.length; i++) {
            context.beginPath();
            if (clickDrag[i] && i) { //当是拖动而且i!=0时，从上一个点开始画线
                context.moveTo(clickX[i - 1], clickY[i - 1]);
            } else {
                context.moveTo(clickX[i] - 1, clickY[i]);
            }
            context.lineTo(clickX[i], clickY[i]);
            context.closePath();
            context.strokeStyle = clickColor[i]; //设置绘图颜色
            context.lineWidth = clickSize[i]; //设置绘图画笔粗细
            context.stroke();
        }


        /* 判断是否为蜡笔，制作蜡笔效果 */
        if (curTool == "crayon") {
            /* 蜡笔效果时，对绘画的效果进行了透明度的处理，并增加蜡笔效果背景图片 */
            context.globalAlpha = 0.4;
            context.drawImage(crayonTextureImage, 0, 0, canvasWidth, canvasHeight);
        }
        context.globalAlpha = 1;
    }

    /* 鼠标点击或鼠标移动时标志量paint=true表示可以进行绘画 */
    $('#canvas').mousedown(function(e) {
        /* 绘画位置 */
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        paint = true;
        addClick(mouseX, mouseY, false);
        redraw();
    });
    $('#canvas').mousemove(function(e) {
        if (paint) {
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
            redraw();
        }
    });

    /* 鼠标抬起或鼠标指针离开元素时绘画标志量paint=false表示绘画停止 */
    $('#canvas').mouseup(function(e) {
        paint = false;
        redraw();
    });
    $('#canvas').mouseleave(function(e) {
        paint = false;
    });

    /* 清空canvas画板 */
    $('.clearCanvas').mousedown(function(e) {
        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        clickColor = new Array();
        clearCanvas();
    });
})