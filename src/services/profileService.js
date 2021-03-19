const knex = require('../knex/connection');

const getOneById = (id) => {
  return knex('profiles').where({ id }).first();
}
module.exports = {
  getOneById,
}