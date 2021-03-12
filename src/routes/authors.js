var express = require('express');
var router = express.Router();
var indexController = require('../controller/authorController');
var middleware = require('../middleware/authors');

router.post('/authors', middleware.validatePost,indexController.createOne);
router.get('/authors/:slug', middleware.validateGetOne, indexController.getOne);
router.get('/authors', middleware.validateGetAll, indexController.getAll);
router.patch('/authors/:id', middleware.validatePatchOne, indexController.patchOne);
router.delete('/authors/:id', middleware.validateDeleteOne, indexController.deleteOne);

module.exports = router;