// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('books_categories', table => {
            table.increments('id').primary();
            table.integer('category_id').unsigned();
            table.foreign('category_id').references('categories.id').onDelete('CASCADE');
            table.integer('book_id').unsigned();
            table.foreign('book_id').references('books.id').onDelete('CASCADE');
        });
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};

/**
 * @param {import("knex")} knex
 */
exports.down = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.dropTableIfExists('books_categories');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};
