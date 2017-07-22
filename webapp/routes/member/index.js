var express = require('express');
var router = express.Router();

/* GET member/index page. */
router.get('/', function(req, res, next) {
    res.render('member/index');
});

module.exports = router;
