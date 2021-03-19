const knex = require('../knex/connection');

const getOneById = (id) => {
  return knex('categories').where({ id }).first();
}
module.exports = {
  getOneById,
}