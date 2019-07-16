import * as Knex from 'knex';

export async function seed(knex: Knex): Promise<any> {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        { first_name: 'Jermaine', last_name: 'Cole', email: 'j.cole@no.pw' },
        { first_name: 'Kendrick', last_name: 'Lamar', email: 'k.lamar@no.pw' },
        { first_name: 'Aubrey', last_name: 'Graham', email: 'a.graham@no.pw' }
      ]);
    });
}
