var express = require('express');
var router = express.Router();

router.get('/', function(req,res,next) {
    res.render('member/grade');
});

module.exports = router;
