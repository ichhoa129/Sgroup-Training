const knex = require('../knex/connection');

const getIndex =async function(req, res, next) {
   const data = await knex('users').select();
   
   return res.json({
     data
   });
}

module.exports = {
    getIndex
}