var express = require('express');
var router = express.Router();

/* GET member/forget_login_pwd page. */
router.get('/', function(req, res, next) {
    res.render('setting/forget_login_pwd');
});

module.exports = router;
