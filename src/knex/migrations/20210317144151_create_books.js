
exports.up = function(knex) {
    return knex.schema.createTable('books', (table) => {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      // table.integer('author_id').unsigned();
      // table.foreign('author_id').references('authors.id').onDelete('CASCADE');
      table.integer('author_id').unsigned().references('id').inTable('authors');
      table.datetime('return_date');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('books');
  };
  