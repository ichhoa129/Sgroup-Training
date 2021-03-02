var express = require('express');
var router = express.Router();
var indexRouter = require('../controller/indexController');
/* GET home page. */
router.get('/', indexRouter.getIndex);

module.exports = router;
