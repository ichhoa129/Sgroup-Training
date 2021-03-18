// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = function(knex) {
    return knex.schema.createTable('authors', (table) => {
      table.increments('id').primary();
      table.string('email').unique();
      table.string('password');
      table.integer('role_id').unsigned().references('id').inTable('roles');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('authors');
  };
  