var express = require('express');
var router = express.Router();

/* GET member/notice page. */
router.get('/', function(req, res, next) {
    res.render('member/notice');
});

module.exports = router;