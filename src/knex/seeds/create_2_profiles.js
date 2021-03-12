const faker = require('faker');
exports.seed = knex => {
  const profiles = [];
  for (let i = 0; i < 100; i++) {
    const first_name = faker.name.firstName();
    const last_name = faker.name.lastName();
    const gender = faker.random.boolean();
    const author_id = i + 1;
    profiles.push({ first_name, last_name, gender, author_id });
  }
    knex('profiles').del() 
    .then(() => knex('profiles').insert(profiles));
    }
