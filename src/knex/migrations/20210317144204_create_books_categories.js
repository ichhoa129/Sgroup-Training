
exports.up = function(knex) {
    return knex.schema.createTable('books_categories', (table) => {
      table.increments('id').primary();
      // table.integer('category_id').unsigned();
      // table.foreign('category_id').references('categories.id').onDelete('CASCADE');
      table.integer('category_id').unsigned().references('id').inTable('categories');
      // table.integer('book_id').unsigned();
      table.integer('book_id').unsigned().references('id').inTable('books');
      // table.foreign('book_id').references('books.id').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('books_categories');
  };
  