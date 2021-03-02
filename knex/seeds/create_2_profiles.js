exports.seed = knex => knex('profiles').del() // Deletes ALL existing entries
    .then(() => knex('profiles').insert([ // Inserts seed entries
        {
          email: "Maximilian.Bergnaum@gmail.com", gender: 0, author_id:1
        }, 
        {
          email: "Quentin.Rosenbaum@yahoo.com", gender: 0, author_id:2
        } 
      ]));
