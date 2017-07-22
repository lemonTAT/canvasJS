var express = require('express');
var router = express.Router();

/* GET cart/index page. */
router.get('/', function (req, res, next) {
    res.render('cart/index');
})

module.exports = router;