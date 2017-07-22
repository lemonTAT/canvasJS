var express = require('express');
var router = express.Router();
var request= require('request');

/* GET demo page. */
router.get('/', function(req, res, next) {
    request('http://127.0.0.1:3003/api/users/user', function(error, response, body){
         if(!error && response.statusCode == 200){
         var data = JSON.parse(body);
/*       var data = {
             "id": "1",
             "username": "ifany",
             "email": "ifanychen@gmail.com",
             "avatar": "https://avatars0.githubusercontent.com/u/5987563"
         }
*/
            res.render('test/demo', {data: data});
         }else{
            res.render('error', {"message":"出错啦", error: {"stack": "sdas", status: 404}});
         }
     });
});

module.exports = router;
