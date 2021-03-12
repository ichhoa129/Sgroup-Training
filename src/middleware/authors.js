const knex = require('../knex/connection');

const validatePost = async (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    return res.json({
      status: "fail",
      statusCode: 400, // Bad request
      message: "Email or password is missing from the form",
    });
  }

  if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email.toLowerCase())) {
    return res.json({
      status: "fail",
      statusCode: 400,
      message: "Email format is incorrect"
    })
  }
  const user = await knex('authors').where({ email: req.body.email }).first();
  if(user) {
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: "User already exists",
    });
  }
  return next();
}
const validateGetOne = (req, res, next) => {
  if(!req.params.id || isNaN(req.params.id))
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: "Id is not integer",
    });
  return next();
}
const validateGetAll = (req, res, next) => {
  if(req.query.page && isNaN(req.query.page))
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: 'Page is not integer'
    });

  if(req.query.limit && isNaN(req.query.limit))
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: 'Limit is not integer'
    });
  if(!['desc','asc'].includes(req.query.order.toLowerCase())) 
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: 'Order must be asc or desc',
    });
  return next();
}

const validatePatchOne = (req, res, next) => {
  if(!req.params.id || isNaN(req.params.id))
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: "Id is not integer",
    });
  if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email.toLowerCase())) {
    return res.json({
      status: "fail",
      statusCode: 400,
      message: "Email format is incorrect"
    })
  }
  return next();
}

const validateDeleteOne = (req, res, next) => {
  if(!req.params.id || isNaN(req.params.id))
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: "Id is not integer",
    });
  return next();
}
module.exports = {
  validatePost,
  validateGetOne,
  validateGetAll,
  validatePatchOne,
  validateDeleteOne,
}