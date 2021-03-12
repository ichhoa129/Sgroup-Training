var express = require('express');
var router = express.Router();
var Controller = require('../controller/bookController');
var middleware = require('../middleware/books');

router.post('/books', middleware.validatePost,Controller.createOne);
router.get('/books/:slug', middleware.validateGetOne, Controller.getOne);
router.get('/books', middleware.validateGetAll, Controller.getAll);
router.patch('/books/:id', middleware.validatePatchOne, Controller.patchOne);
router.delete('/books/:id', middleware.validateDeleteOne, Controller.deleteOne);

module.exports = router;
