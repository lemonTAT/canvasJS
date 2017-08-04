$(function() {
    var screenWidth = document.documentElement.clientWidth,
        screenHeight = document.documentElement.clientHeight,
        canvasWidth = 1200,
        canvasHeight = screenHeight - 200, //canvas标签的大小变量
        canvasDiv = document.getElementById('canvasDiv'), //canvas容器
        canvas = document.createElement('canvas'), //创建了元素canvas
        crayonTextureImage = new Image(); //新建图片对象用于蜡笔样式

    /* 设置canvas属性 */
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.setAttribute('id', 'canvas');

    canvasDiv.appendChild(canvas); //为canvasDiv增加了子元素canvas

    /* 设置蜡笔样式图片路径 */
    crayonTextureImage.src = "assets/images/crayon-texture.png";

    /* 解决IE浏览器不支持html5 canvas：通过excanvas.js专门为IE扩展的canvas元素包中提供的处理方法initElement进行相应的判断处理 */
    if (typeof G_vmlCanvasManager != 'undefined') {
        canvas = G_vmlCanvasManager.initElement(canvas);
    }
    /* 使用canvas的绘图功能:调用canvas的上下文 */
    context = canvas.getContext("2d");

    /* 绘画变量 */
    var draw, x, y, w, h,
        canvasArr = [],
        type = 'pen',
        color = '#000',
        style = 'stroke',
        lineWidth = '1';

    /* 绘画形状 */
    $('.line-shape').on('click', 'a', function() {
        $(this).addClass('active').siblings('.active').removeClass('active');
        type = $(this).attr('data-use');
        if (type === 'line' || type === 'pen') {
            style = 'stroke';
            $('.style .stroke').addClass('active').siblings('.fill').removeClass('active').hide();
        } else {
            $('.style .fill').show();
        }
    });

    /* 描边 || 填充 */
    $('.style').on('click', 'a', function() {
        style = $(this).attr('data-use');
        $(this).addClass('active').siblings().removeClass('active');
    });

    /* 线宽 */
    $('.line-width').on('change', function() {
        lineWidth = $(this).val();
    });
    $('.line-size').on('click', '.size', function() {
        lineWidth = $(this).attr('data-size');
    });

    /* 颜色 */
    $('.input-color').on('change', function() {
        color = $(this).val();
    });
    $('.color-choice').on('click', 'span', function() {
        color = $(this).attr('class');
    });

    /* 清空画板 */
    $('.clearCanvas').on('click', function() {
        canvasArr = [];
        context.clearRect(0, 0, canvasWidth, canvasHeight);
    })

    /* 鼠标点击事件 */
    canvas.onmousedown = function(e) {
        x = e.offsetX;
        y = e.offsetY;
        if (type == "pen") {
            context.beginPath();
            context.moveTo(x, y);
        }
        if (type == "eraser") {
            context.clearRect(x - 5, y - 5, 10, 10);
        }

        var draw = new Draw(context, { type: style, color: color, width: lineWidth }); //实例化构造函数

        canvas.onmousemove = function(e) {
            w = e.offsetX;
            h = e.offsetY;


            if (type != "eraser") {
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                if (canvasArr.length != 0) {
                    context.putImageData(canvasArr[canvasArr.length - 1], 0, 0, 0, 0, canvasWidth, canvasHeight);
                }
            }

            draw[type](x, y, w, h);
        }

        canvas.onmouseup = function() {
            //debugger
            canvas.onmousemove = null;
            document.onmouseup = null;
            canvasArr.push(context.getImageData(0, 0, canvasWidth, canvasHeight));
        }
    }
})