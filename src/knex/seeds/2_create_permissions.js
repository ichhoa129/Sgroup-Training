
exports.seed = function(knex) {
  return knex('permissions').del()
    .then(function () {
      return knex('permissions').insert([
        { name: "CREATE_USER"},
        { name: "READ_USER"},
        { name: "UPDATE_USER"},
        { name: "DELETE_USER"},
      ]);
    });
};
