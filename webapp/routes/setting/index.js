var express = require('express');
var router = express.Router();

/* GET member/setting page. */
router.get('/', function(req, res, next) {
    res.render('setting/index');
});

module.exports = router;
