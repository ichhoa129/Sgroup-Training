const knex = require('../knex/connection');
const createOne = async (req, res, next) => {
  try {
    const data = await knex('authors').insert({
      email: req.body.email,
      password: req.body.password,
    });
    const inserted = await knex('authors').where('id', data[0]).first();
    return res.json({
      status: 'success',
      data: inserted,
    });
  } catch(err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to insert author',
    });
  }
}
const getOne = async (req, res, next) => {
  try {
    const data = await knex('authors').where({ id: req.params.id }).first();
    if(!data) {
      return res.json({
        status: "fail",
        code: 404,
        message: 'User not found',
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
      message: 'Failed to get author',
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

    const data = await knex('authors')
      .where('email', 'like', `%${q}%`)
      .orderBy(orderBy, order)
      .offset((page*limit)-limit)
      .limit(limit)
      .select();

    const count = await knex('authors').count('id as count');
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
      message: 'Failed to get authors',
    });
  }
}
const patchOne = async (req, res, next) => {
  try {
    const user = await knex('authors').where({ id: req.params.id }).first();
    if(!user)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'User does not exist'
      })
    await knex('authors').where({ id: req.params.id }).update({
      email: req.body.email,
      password: req.body.password,
    });
    return res.json({
      status: 'success'
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to update author',
    });
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const user = await knex('authors').where({ id: req.params.id }).first();
    if(!user)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'User does not exist'
      })
    await knex('authors').where({ id: req.params.id }).del()
    return res.json({
      status: 'success'
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to delete author',
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