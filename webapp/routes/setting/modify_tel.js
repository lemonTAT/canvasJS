var express = require('express');
var router = express.Router();

/* GET setting/modify_tel page. */
router.get('/', function(req, res, next) {
    res.render('setting/modify_tel');
})

module.exports = router;
