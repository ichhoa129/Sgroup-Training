const faker = require('faker');
exports.seed = knex => {
  const books = [];
  for (let i = 0; i < 300; i++) {
    const category_id = faker.random.number({ min: 1, max: 6 });
    const book_id = faker.random.number({ min: 1, max: 300 });
    books.push({ category_id, book_id });
  }
    knex('books_categories').del() 
    .then(() => knex('books_categories').insert(books));
    }
