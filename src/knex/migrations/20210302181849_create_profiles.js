// @ts-check
/**
 * @param {import("knex")} knex
 */
exports.up = async knex => {
    const tracsaction = await knex.transaction();
    try {
        await tracsaction.schema.createTable('profiles', table => {
            table.increments('id').primary();
            table.string('first_name');
            table.string('last_name');
            table.boolean('gender');
            table.integer('author_id').unsigned().unique();
            table.foreign('author_id').references('authors.id').onDelete('CASCADE');
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
        await tracsaction.schema.dropTableIfExists('profiles');
        await tracsaction.commit();
    } catch (error) {
        await tracsaction.rollback();
    }
};
