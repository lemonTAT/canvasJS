var express = require('express');
var router = express.Router();

/* GET setting/login_pwd page */
router.get('/', function(req, res, next) {
    res.render('setting/login_pwd');
});

module.exports = router;
