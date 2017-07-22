var express = require('express');
var router = express.Router();

/* GET setting/address page. */
router.get('/', function(req, res, next) {
    res.render('setting/address');
});

module.exports = router;
