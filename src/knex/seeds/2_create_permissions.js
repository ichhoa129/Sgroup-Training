
exports.seed = function(knex) {
  return knex('permissions').del()
    .then(function () {
      return knex('permissions').insert([
        { name: 'CREATE_AUTHOR'},
        { name: 'READ_AUTHOR'},
        { name: 'UPDATE_AUTHOR'},
        { name: 'DELETE_AUTHOR'},

        { name: 'CREATE_ROLE'},
        { name: 'READ_ROLE'},
        { name: 'UPDATE_ROLE'},
        { name: 'DELETE_ROLE'},

        { name: 'CREATE_PERMISSION'},
        { name: 'READ_PERMISSION'},
        { name: 'UPDATE_PERMISSION'},
        { name: 'DELETE_PERMISSION'},

        { name: 'CREATE_PROFILE'},
        { name: 'READ_PROFILE'},
        { name: 'UPDATE_PROFILE'},
        { name: 'DELETE_PROFILE'},

        { name: 'CREATE_CATEGORY'},
        { name: 'READ_CATEGORY'},
        { name: 'UPDATE_CATEGORY'},
        { name: 'DELETE_CATEGORY'},

        { name: 'CREATE_BOOK'},
        { name: 'READ_BOOK'},
        { name: 'UPDATE_BOOK'},
        { name: 'DELETE_BOOK'},
      ]);
    });
};
