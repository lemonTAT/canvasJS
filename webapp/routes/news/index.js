var express = require('express');
var router = express.Router();

/* GET news/index page. */
router.get('/', function (req, res, next) {
    res.render('news/index');
})

module.exports = router;