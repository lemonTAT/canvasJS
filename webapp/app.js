var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var proxy = require('express-http-proxy');
var proxy = require('http-proxy-middleware');
var nunjucks = require('nunjucks');

var app = express();

app.set('views', path.join(__dirname, 'src/views'));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
if (app.get('env') === 'development') {
    app.set('views', path.join(__dirname, 'src/views'));
    app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
}

if (app.get('env') === 'production') {
    app.set('views', path.join(__dirname, 'dist/views'));
    app.use('/assets', express.static(path.join(__dirname, 'dist/assets')));
}

nunjucks.configure(app.get('views'), {
    autoescape: true,
    express: app
});
app.set('view engine', 'html');

// uncomment after placing your favicon in /assets
//app.use(favicon(path.join(__dirname, 'assets', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


/* API routes proxy 开发环境 */
if (app.get('env') === 'development') {
    var memberApiProxy = proxy({ target: 'http://member.api.qcfq.com', changeOrigin: true }); /* 会员 */
    var orderApiProxy = proxy({ target: 'http://order.api.qcfq.com', changeOrigin: true }); /* 订单 */
    var rosepayApiProxy = proxy({ target: 'http://rosepay.api.qcfq.com', changeOrigin: true }); /* 支付 */
    var rmsApiProxy = proxy({ target: 'http://rms.api.qcfq.com', changeOrigin: true }); /* 内容 */
}

/* API routes proxy 生产环境 */
if (app.get('env') === 'production') {
    var memberApiProxy = proxy({ target: 'http://member.api.rosepie.com', changeOrigin: true }); /* 会员 */
    var orderApiProxy = proxy({ target: 'http://order.api.rosepie.com', changeOrigin: true }); /* 订单 */
    var rosepayApiProxy = proxy({ target: 'http://rosepay.api.rosepie.com', changeOrigin: true }); /* 支付 */
    var rmsApiProxy = proxy({ target: 'http://rms.api.rosepie.com', changeOrigin: true }); /* 内容 */
}

/* page routes */
var routes = require('./routes/index'); /* 首页 */
var login = require('./routes/user/login'); /* 登录页 */
var memberIndex = require('./routes/member/index'); /* 个人中心 */
var memberSetting = require('./routes/setting/index'); /* 设置 */
var memberNotice = require('./routes/member/notice'); /* 通知 */
var cartIndex = require('./routes/cart/index'); /* 购物车 */
var newsIndex = require('./routes/news/index'); /* 资讯 */
var modifyTel = require('./routes/setting/modify_tel'); /* 设置--修改手机号 */
var address = require('./routes/setting/address'); /* 设置--管理收货地址 */
var addressEdit = require('./routes/setting/address_edit'); /* 设置--编辑收货地址 */
var loginPwd = require('./routes/setting/login_pwd'); /* 设置--登录密码管理 */
var modifyLoginPwd = require('./routes/setting/modify_login_pwd'); /* 设置--登录密码管理--修改密码 */
var forgetLoginPwd = require('./routes/setting/forget_login_pwd'); /* 设置--登录密码管理--忘记密码 */
var dealPwd = require('./routes/setting/deal_pwd'); /* 设置--交易密码管理 */
var grade = require('./routes/member/grade');/* 我的头衔 */

app.use('/', routes);
app.use('/login', login);
app.use('/member', memberIndex);
app.use('/cart', cartIndex);
app.use('/news', newsIndex);
app.use('/member/setting', memberSetting);
app.use('/member/notice', memberNotice);
app.use('/setting/modifyTel', modifyTel);
app.use('/setting/address', address);
app.use('/address/edit', addressEdit);
app.use('/setting/loginPwd', loginPwd);
app.use('/setting/modifyLoginPwd', modifyLoginPwd);
app.use('/setting/forgetLoginPwd', forgetLoginPwd);
app.use('/setting/dealPwd', dealPwd);
app.use('/member/grade', grade);

/*api*/
app.use('/login.jhtml', memberApiProxy)
app.use('/logout.jhtml', memberApiProxy)


/*test*/
var testDemo = require('./routes/test/demo') /* 测试 */
app.use('/demo', testDemo)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
