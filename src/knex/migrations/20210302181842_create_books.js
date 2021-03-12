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
            table.integer('author_id').unsigned();
            table.foreign('author_id').references('authors.id').onDelete('CASCADE');
            table.datetime('return_date');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
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
