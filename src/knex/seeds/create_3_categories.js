exports.seed = knex => knex('categories').del() 
    .then(() => knex('categories').insert([
        {name: "Entertainment"}, 
        {name: "History"}, 
        {name: "Science"},
        {name: "Math"},
        {name: "Physic"},
        {name: "Chemistry"}
      ]));
