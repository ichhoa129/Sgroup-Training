exports.seed = knex => knex('books').del() // Deletes ALL existing entries
    .then(() => knex('books').insert([ // Inserts seed entries
        {
          title:"Dynamic Mobility Strategist", description: "maiores nihil dignissimos libero cumque deserunt ipsum ut quae totam", author_id: 1, return_date:"2021-05-12 12:39:31"
        }, 
        {
          title:"Dynamic Integration Planner", description: "omnis aut doloremque hic quis debitis officiis sit iste facere", author_id: 2, return_date:"2021-06-02 11:39:56"
        } 
      ]));
