/* 构造绘画工具 */
/* 定义构造函数 */
function Draw(obj,setting){
    this.obj=obj;
    this.type=setting.type||"stroke";
    this.color=setting.color||"#000";
    this.width=setting.width||"1";
}
/* 使用 prototype 属性来向对象添加属性 */
Draw.prototype={
    /* 初始化 */
    init:function(){
        this.obj.strokeStyle=this.color;
        this.obj.fillStyle=this.color;
        this.obj.lineWidth=this.width;
    },
    /* 矩形 */
    rect:function(x,y,x1,y1){
        this.init();
        this.obj.beginPath();
        this.obj.rect(x,y,x1-x,y1-y);
        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
    },
    /* 直线 */
    line:function(x,y,x1,y1){
        this.init();
        this.obj.beginPath();
        this.obj.moveTo(x,y);
        this.obj.lineTo(x1,y1);
        this.obj.stroke();
    },
    /* 圆形 */
    circle:function(x,y,x1,y1){
        this.init();
        var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));
        this.obj.beginPath();
        this.obj.arc(x,y,r,0,2*Math.PI);
        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
    },
    /* 多边形 */
    poly:function(x,y,x1,y1,n){
        this.init();
        var obj=this.obj;
        var r=Math.sqrt(Math.pow(x-x1,2)+Math.pow(y-y1,2));;
        obj.save();
        obj.translate(x,y);
        obj.rotate(Math.PI/2);
        var nx=r*Math.cos(Math.PI/n);
        var ny=r*Math.sin(Math.PI/n);
        obj.beginPath();
        obj.lineCap="round";
        obj.moveTo(nx,ny);
        for(var i=0;i<=n;i++){
            obj.rotate(Math.PI*2/n);
            obj.lineTo(nx,-ny);
        }
        if(this.type=="stroke"){
            this.obj.stroke();
        }else if(this.type=="fill"){
            this.obj.fill();
        }
        obj.restore();
    },
    /* 铅笔 */
    pen:function(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.lineCap="round";
        this.obj.lineTo(x1,y1);
        this.obj.stroke();
        this.obj.restore();
    },
    /* 橡皮 */
    eraser:function(x,y,x1,y1){
        this.obj.lineCap="round";
        this.obj.clearRect(x1-5,y1-5,10,10);
    },
    /* 剪切 */
    cut:function(x,y,x1,y1){
        this.init();
        this.obj.save();
        this.obj.setLineDash([4,2]);
        this.obj.beginPath();
        this.obj.lineWidth=1;
        this.obj.rect(x,y,x1-x,y1-y);
        this.obj.stroke();
        this.obj.restore();
    }
}