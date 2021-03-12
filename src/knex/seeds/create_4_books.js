const faker = require('faker');
exports.seed = knex => {
  const books = [];
  for (let i = 0; i < 300; i++) {
    const title = faker.name.title();
    const description = faker.commerce.productDescription();
    const author_id = faker.random.number({ min: 1, max: 100 });
    const return_date = faker.date.future();
    books.push({ title, description, author_id, return_date });
  }
    knex('books').del() 
    .then(() => knex('books').insert(books));
    }
