const knex = require('../knex/connection');

const validatePost = async (req, res, next) => {
  const {title, description, description, author_id} = req.body;
  if(!title|| !description || !author_id) {
    return res.json({
      status: "fail",
      statusCode: 400, // Bad request
      message: "title, description or author_id is missing from the form",
    });
  }

  const book = await knex('books').where('title','like',`${title}`).first();
  if(book) {
    return res.json({
      status: 'fail',
      statusCode: 400,
      message: "Book already exists",
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