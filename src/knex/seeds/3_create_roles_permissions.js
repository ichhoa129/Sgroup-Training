
exports.seed = function(knex) {
  return knex('roles_permissions').del()
    .then(function () {
      return knex('roles_permissions').insert([
        { role_id: 1, permission_id: 1},
        { role_id: 1, permission_id: 2},
        { role_id: 1, permission_id: 3},
        { role_id: 1, permission_id: 4},
        { role_id: 2, permission_id: 2},
       
      ]);
    });
};