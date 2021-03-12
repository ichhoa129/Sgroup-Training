var express = require('express');
var router = express.Router();
var Controller = require('../controller/categoryController');
var middleware = require('../middleware/categories');

router.post('/categories', middleware.validatePost,Controller.createOne);
router.get('/categories/:slug', middleware.validateGetOne, Controller.getOne);
router.get('/categories', middleware.validateGetAll, Controller.getAll);
router.patch('/categories/:id', middleware.validatePatchOne, Controller.patchOne);
router.delete('/categories/:id', middleware.validateDeleteOne, Controller.deleteOne);

module.exports = router;
