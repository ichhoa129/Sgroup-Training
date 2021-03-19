var express = require('express');
var router = express.Router();
var Controller = require('../controller/categoryController');
var middleware = require('../middleware/categories');
var { checkAuthentication } = require('../middleware/authentication');
const { checkAuthorization } = require('../middleware/authorization');
const {READ_CATEGORY, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY} = require('../common/enum/permission.enum');

router.post('/categories', middleware.validatePost,checkAuthentication,checkAuthorization(CREATE_CATEGORY),Controller.createOne);
router.get('/categories/:id', middleware.validateGetOne,checkAuthentication,checkAuthorization(READ_CATEGORY), Controller.getOne);
router.get('/categories', middleware.validateGetAll,checkAuthentication,checkAuthorization(READ_CATEGORY), Controller.getAll);
router.patch('/categories/:id', middleware.validatePatchOne,checkAuthentication,checkAuthorization(UPDATE_CATEGORY), Controller.patchOne);
router.delete('/categories/:id', middleware.validateDeleteOne,checkAuthentication,checkAuthorization(DELETE_CATEGORY), Controller.deleteOne);

module.exports = router;
