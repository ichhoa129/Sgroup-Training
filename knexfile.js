// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: process.env.DB_TYPE,
    connection: {
      host : process.env.DB_HOST,
      port: process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/src/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/src/knex/seeds'
    }
  }

};
