var express = require('express');
var router = express.Router();

/* GET member/modify_login_pwd page. */
router.get('/', function(req, res, next) {
    res.render('setting/modify_login_pwd');
});

module.exports = router;
