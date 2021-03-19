const knex = require('../knex/connection');

const getOneById = (id) => {
  return knex('books').where({ id }).first();
}
module.exports = {
  getOneById,
}