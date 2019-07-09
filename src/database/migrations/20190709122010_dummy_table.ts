import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('dummy', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('col_1', 50).notNullable();
    table.enum('enum_col', ['opt_1', 'opt_2', 'opt_3']).defaultTo('opt_1');
    table.text('col_text');
    table.date('col_date').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('dummy');
}
