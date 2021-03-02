// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('authors', table => {
            table.increments('id').primary();
            table.string('first_name');
            table.string('last_name');
            table.string('age');
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
        await tracsaction.schema.dropTableIfExists('authors');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};
