
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        { name: 'Science'},
        { name: 'Entertainment'},
        { name: 'History'},
        { name: 'Comics'},
        { name: 'Mathematics'},
        { name: 'Geography'},
      ]);
    });
};
