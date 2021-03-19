const knex = require('../knex/connection');

const createOne = async (req, res, next) => {
  try {
    const {name} = req.body;
    const data = await knex('categories').insert({
      name
    });
    const inserted = await knex('categories').where('id', data[0]).first();
    return res.json({
      status: 'success',
      data: inserted,
    });
  } catch(err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to insert category',
    });
  }
}
const getOne = async (req, res, next) => {
  try {
    const data = await knex('categories').where({ id: req.params.id }).first();
    if(!data) {
      return res.json({
        status: "fail",
        code: 404,
        message: 'Category not found',
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
      message: 'Failed to get category',
    });
  }
}
const getAll = async (req, res, next) => {
  try {
    let page = req.query.page || 1;
    let limit = req.query.limit || 5;
    let q = req.query.q || "";
    const orderBy = req.query.orderBy || "id";
    const order = req.query.order || "asc";

    const data = await knex('categories')
      .where('name', 'like', `%${q}%`)
      .orderBy(orderBy, order)
      .offset((page*limit)-limit)
      .limit(limit)
      .select();

    const count = await knex('categories').count('id as count');
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
      message: 'Failed to get categories',
    });
  }
}
const patchOne = async (req, res, next) => {
  try {
    const user = await knex('categories').where({ id: req.params.id }).first();
    if(!user)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'Category does not exist'
      })
    await knex('categories').where({ id: req.params.id }).update({
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
      message: 'Failed to update category',
    });
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const category = await knex('categories').where({ id: req.params.id }).first();
    if(!category)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'Category does not exist'
      })
    await knex('categories').where({ id: req.params.id }).del()
    return res.json({
      status: 'success'
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to delete category',
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