
const faker = require('faker');
exports.seed = function(knex) {
  const authors = [];
  authors.push({
    email: "admin@gmail.com",
    password: "123456",
    role_id: 1
  });
  for (let i = 0; i < 99; i++) {
    const email = faker.internet.email();
    const password = '123456';
    authors.push({ email, password, role_id: 2 });
  }
  return knex('authors').del()
    .then(function () {
      return knex('authors').insert(authors);
    });
};
