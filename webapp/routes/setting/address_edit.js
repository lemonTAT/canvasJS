var express = require('express');
var router = express.Router();

/* GET setting/address_edit page */
router.get('/', function(req, res, next) {
    res.render('setting/address_edit');
})

module.exports = router;
