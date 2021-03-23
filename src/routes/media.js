var express = require('express');
var router = express.Router();

var Controller = require('../controller/mediaController');
const {uploadMulter} = require('../helpers/imageUpload');

router.post('/uploadSingle', uploadMulter('image', false), Controller.uploadSingle);
router.post('/uploadMany', uploadMulter('images', true, 5), Controller.uploadMany);
module.exports = router;
