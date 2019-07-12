import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table
      .string('email', 100)
      .unique()
      .notNullable();
    table
      .dateTime('created_at')
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .dateTime('updated_at')
      .defaultTo(knex.fn.now())
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
