exports.seed = knex => knex('categories').del() // Deletes ALL existing entries
    .then(() => knex('categories').insert([ // Inserts seed entries
        {
          name: "Entertainment"
        }, 
        {
          name: "History"
        }, 
        {
          name: "Science"
        },
        {
          name: "Math"
        },
        {
          name: "Physic"
        },
        {
          name: "Chemistry"
        }
      ]));
