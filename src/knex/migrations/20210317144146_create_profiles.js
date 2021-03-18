
exports.up = function(knex) {
    return knex.schema.createTable('profiles', (table) => {
      table.increments('id').primary();
      table.string('first_name');
      table.string('last_name');
      table.boolean('gender');
      // table.integer('author_id').unsigned().unique();
      table.integer('author_id').unsigned().references('id').inTable('authors');
      // table.foreign('author_id').references('authors.id').onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('profiles');
  };
  