var express = require('express');
var router = express.Router();
//var request= require('request');
//var script = 'js/index.js';

/* GET home page. */
router.get('/', function(req, res, next) {

    res.render('index');

/*  request('http://127.0.0.1:3003/api/page', function(error, response, body){
    if(!error && response.statusCode == 200){
      var data = JSON.parse(body);
      res.render('index', {initData: data, pageScript: script});
    }else{
      res.render('error', {"message":"出错啦", error: {"stack": "sdas", status: 404}});
    }
  });*/
});

module.exports = router;
