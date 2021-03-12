const knex = require('../knex/connection');

const createOne = async (req, res, next) => {
  try {
    const {title, description, author_id, return_date} = req.body;
    const data = await knex('books').insert({
      title,
      description, 
      author_id,
      return_date
    });
    const inserted = await knex('books').where('id', data[0]).first();
    return res.json({
      status: 'success',
      data: inserted,
    });
  } catch(err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to insert book',
    });
  }
}
const getOne = async (req, res, next) => {
  try {
    const data = await knex('books').where({ id: req.params.id }).first();
    if(!data) {
      return res.json({
        status: "fail",
        code: 404,
        message: 'Book not found',
      })
    }
    return res.json({
      status: "success",
      data,
    })
  } catch(err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to get book',
    });
  }
}
const getAll = async (req, res, next) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    let q = req.query.q || "";
    const orderBy = req.query.orderBy || "";
    const order = req.query.order || "";

    const data = await knex('books')
      .where('title', 'like', `%${q}%`)
      .orderBy(orderBy, order)
      .offset((page*limit)-limit)
      .limit(limit)
      .select();

    const count = await knex('books').count('id as count');
    return res.json({
      status: 'success',
      data,
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      count: count[0].count
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to get books',
    });
  }
}
const patchOne = async (req, res, next) => {
  try {
    const book = await knex('books').where({ id: req.params.id }).first();
    if(!book)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'Book does not exist'
      })
    await knex('books').where({ id: req.params.id }).update({
      title: req.body.title,
      description: req.body.description
    });
    return res.json({
      status: 'success'
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to update book',
    });
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const book = await knex('books').where({ id: req.params.id }).first();
    if(!book)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'Book does not exist'
      })
    await knex('books').where({ id: req.params.id }).del()
    return res.json({
      status: 'success'
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to delete book',
    });
  }
}
module.exports = {
  createOne,
  getOne,
  getAll,
  patchOne,
  deleteOne,
};