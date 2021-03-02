exports.seed = knex => knex('books_categories').del() // Deletes ALL existing entries
    .then(() => knex('books_categories').insert([ // Inserts seed entries
        {
          category_id:1, book_id:1
        }, 
        {
          category_id:2, book_id:2
        } 
      ]));
