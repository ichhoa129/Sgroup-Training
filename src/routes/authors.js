var express = require('express');
var router = express.Router();
var indexController = require('../controller/authorController');
var middleware = require('../middleware/authors');
var { checkAuthentication } = require('../middleware/authentication');
const { checkAuthorization } = require('../middleware/authorization');
const {READ_AUTHOR, CREATE_AUTHOR, UPDATE_AUTHOR, DELETE_AUTHOR} = require('../common/enum/permission.enum');

router.post('/authors', middleware.validatePost, checkAuthentication,checkAuthorization(CREATE_AUTHOR), indexController.createOne);
router.get('/authors/:id', middleware.validateGetOne, checkAuthentication,checkAuthorization(READ_AUTHOR), indexController.getOne);
router.get('/authors', middleware.validateGetAll, checkAuthentication,checkAuthorization(READ_AUTHOR), indexController.getAll);
router.patch('/authors/:id', middleware.validatePatchOne, checkAuthentication,checkAuthorization(UPDATE_AUTHOR), indexController.patchOne);
router.delete('/authors/:id', middleware.validateDeleteOne, checkAuthentication,checkAuthorization(DELETE_AUTHOR), indexController.deleteOne);

module.exports = router;