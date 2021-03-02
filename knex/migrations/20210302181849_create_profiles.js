// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('profiles', table => {
            table.increments('id').primary();
            table.string('email');
            table.binary('gender');
            table.integer('author_id').unsigned().references('id').inTable('authors');
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
        await tracsaction.schema.dropTableIfExists('profiles');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};
