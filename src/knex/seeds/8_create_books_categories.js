
const faker = require('faker');
exports.seed = function(knex) {
  const books = [];
  for (let i = 0; i < 300; i++) {
    const category_id = faker.random.number({ min: 1, max: 6 });
    const book_id = faker.random.number({ min: 1, max: 300 });
    books.push({ category_id, book_id });
  }
  return knex('books_categories').del()
    .then(function () {
      return knex('books_categories').insert(books);
    });
};
