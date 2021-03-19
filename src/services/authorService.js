const knex = require('../knex/connection');

const getOneById = (id) => {
  return knex('authors').where({ id }).first();
}

const getOneByEmail = (email) => {
  return knex('authors').where({ email }).first();
}

module.exports = {
  getOneById,
  getOneByEmail,
}