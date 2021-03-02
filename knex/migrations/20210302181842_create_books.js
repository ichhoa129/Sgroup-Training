// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('books', table => {
            table.increments('id').primary();
            table.string('title');
            table.string('description');
            table.integer('author_id').unsigned().references('id').inTable('authors');
            table.dateTime('return_date');
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
        await tracsaction.schema.dropTableIfExists('books');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};
