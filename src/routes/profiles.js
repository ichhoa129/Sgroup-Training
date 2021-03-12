var express = require('express');
var router = express.Router();
var Controller = require('../controller/profileController');
var middleware = require('../middleware/profiles');

router.post('/profiles', middleware.validatePost,Controller.createOne);
router.get('/profiles/:slug', middleware.validateGetOne, Controller.getOne);
router.get('/profiles', middleware.validateGetAll, Controller.getAll);
router.patch('/profiles/:id', middleware.validatePatchOne, Controller.patchOne);
router.delete('/profiles/:id', middleware.validateDeleteOne, Controller.deleteOne);

module.exports = router;
