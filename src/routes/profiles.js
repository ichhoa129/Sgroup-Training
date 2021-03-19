var express = require('express');
var router = express.Router();
var Controller = require('../controller/profileController');
var middleware = require('../middleware/profiles');

var { checkAuthentication } = require('../middleware/authentication');
const { checkAuthorization } = require('../middleware/authorization');
const {READ_PROFILE, CREATE_PROFILE, UPDATE_PROFILE, DELETE_PROFILE} = require('../common/enum/permission.enum');

router.post('/profiles', middleware.validatePost,checkAuthentication,checkAuthorization(CREATE_PROFILE),Controller.createOne);
router.get('/profiles/:id', middleware.validateGetOne,checkAuthentication,checkAuthorization(READ_PROFILE), Controller.gewtOne);
router.get('/profiles', middleware.validateGetAll,checkAuthentication,checkAuthorization(READ_PROFILE), Controller.getAll);
router.patch('/profiles/:id', middleware.validatePatchOne,checkAuthentication,checkAuthorization(UPDATE_PROFILE), Controller.patchOne);
router.delete('/profiles/:id', middleware.validateDeleteOne,checkAuthentication,checkAuthorization(DELETE_PROFILE), Controller.deleteOne);

module.exports = router;
