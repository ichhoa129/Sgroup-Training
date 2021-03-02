exports.seed = knex => knex('authors').del() // Deletes ALL existing entries
    .then(() => knex('authors').insert([ // Inserts seed entries
        {
          first_name: "Landen", last_name: "Reichel", age: 26
        }, 
        {
          first_name: "Rebeka", last_name: "Schmitt", age: 82
        } 
      ]));
