const knex = require('../knex/connection');

const validatePost = async (req, res, next) => {
  const {first_name, last_name, author_id} = req.body;
  if(!first_name|| !last_name || !author_id) {
    return res.json({
      status: "fail",
      statusCode: 400, // Bad request
      message: "first_name, last_name or author_id is missing from the form",
    });
  }

  const category = await knex('profiles').where({author_id}).first();
  if(category) {
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: "Author's profile already exists",
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
    if(!req.query.order || !['asc', 'desc'].includes(req.query.order.toLowerCase()))
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