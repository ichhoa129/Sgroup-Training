const faker = require('faker');
exports.seed = knex => {
    const authors = [];
    for (let i = 0; i < 100; i++) {
      const email = faker.internet.email();
      const password = '123456';
      authors.push({ email, password });
    }
    knex('authors').del() 
    .then(() => knex('authors').insert(authors));
    }
