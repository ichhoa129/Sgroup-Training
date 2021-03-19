const knex = require('../knex/connection');

const createOne = async (req, res, next) => {
  try {
    const {first_name, last_name, gender, author_id} = req.body;
    const data = await knex('profiles').insert({
        first_name,
        last_name, 
        gender,
        author_id
    });
    const inserted = await knex('profiles').where('id', data[0]).first();
    return res.json({
      status: 'success',
      data: inserted,
    });
  } catch(err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to insert profiles',
    });
  }
}
const getOne = async (req, res, next) => {
  try {
    const data = await knex('profiles').where({ id: req.params.id }).first();
    if(!data) {
      return res.json({
        status: "fail",
        code: 404,
        message: 'profile not found',
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
      message: 'Failed to get profile',
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

    const data = await knex('profiles')
      .where({author_id})
      .orderBy(orderBy, order)
      .offset((page*limit)-limit)
      .limit(limit)
      .select();

    const count = await knex('profiles').count('id as count');
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
      message: 'Failed to get profiles',
    });
  }
}
const patchOne = async (req, res, next) => {
  try {
    const profile = await knex('profiles').where({ id: req.params.id }).first();
    if(!profile)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'Profile does not exist'
      })
    await knex('profiles').where({ id: req.params.id }).update({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      author_id: req.body.author_id
    });
    return res.json({
      status: 'success'
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to update profile',
    });
  }
}
const deleteOne = async (req, res, next) => {
  try {
    const profile = await knex('profiles').where({ id: req.params.id }).first();
    if(!profile)
      return res.json({
        status: 'fail',
        statusCode: 400,
        message: 'Profile does not exist'
      })
    await knex('profiles').where({ id: req.params.id }).del()
    return res.json({
      status: 'success'
    });
  } catch (err) {
    return res.json({
      status: 'error',
      code: 500,
      message: 'Failed to delete profile',
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