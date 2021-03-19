var express = require('express');
var router = express.Router();
var Controller = require('../controller/bookController');
var middleware = require('../middleware/books');
var { checkAuthentication } = require('../middleware/authentication');
const { checkAuthorization } = require('../middleware/authorization');
const {READ_BOOK, CREATE_BOOK, UPDATE_BOOK, DELETE_BOOK} = require('../common/enum/permission.enum');

router.post('/books', middleware.validatePost,checkAuthentication,checkAuthorization(CREATE_BOOK),Controller.createOne);
router.get('/books/:id', middleware.validateGetOne,checkAuthentication,checkAuthorization(READ_BOOK), Controller.getOne);
router.get('/books', middleware.validateGetAll,checkAuthentication,checkAuthorization(READ_BOOK), Controller.getAll);
router.patch('/books/:id', middleware.validatePatchOne,checkAuthentication,checkAuthorization(UPDATE_BOOK), Controller.patchOne);
router.delete('/books/:id', middleware.validateDeleteOne,checkAuthentication,checkAuthorization(DELETE_BOOK), Controller.deleteOne);

module.exports = router;
