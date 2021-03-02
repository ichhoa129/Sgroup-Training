// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('books_categories', table => {
            table.increments('id').primary();
            table.integer('category_id').unsigned().references('id').inTable('categories');
            table.integer('book_id').unsigned().references('id').inTable('books');
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
