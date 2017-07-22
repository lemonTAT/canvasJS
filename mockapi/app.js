/* 变量定义 */
var applicationRoot = __dirname.replace(/\\/g,"/"),
    ipaddress = '127.0.0.1',
    port = 3003,
    mockRoot = applicationRoot + '/api',
    mockFilePattern = '.json',
    mockRootPattern = mockRoot + '/**/*' + mockFilePattern,
    apiRoot = '/api',
    fs = require("fs"),
    glob = require("glob");

/* 创建Express应用 */
var express = require("express");
var app = express();


/* 读取指定的json文件. */
var files = glob.sync(mockRootPattern);

/* 注册api路由 */
if(files && files.length > 0) {
  files.forEach(function(fileName) {
    console.log(fileName);
    var mapping = apiRoot + fileName.replace(mockRoot, '').replace(mockFilePattern,'');

    app.get(mapping, function (req, res) {
      var data =  fs.readFileSync(fileName, 'utf8');

      /*解决浏览器跨域, 已经通过node http proxy解决*/
      // res.header("Access-Control-Allow-Origin", "*");
      // res.header("Access-Control-Allow-Headers", "X-Requested-With");
      // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
      // res.header("X-Powered-By",' 3.2.1');

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(data);
      res.end();
    });

    console.log('注册api路由mapping: %s -> %s', mapping, fileName);
  })
} else {
  console.log('api路由不存在! 请检查api配置.');
}

/* 启动API mocks server. */
console.log('mockapi Server 目录在: [' + applicationRoot +']');
console.log('mockapi Server listening: [http://' + ipaddress + ':' + port + ']');
app.listen(port, ipaddress);