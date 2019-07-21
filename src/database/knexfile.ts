require('dotenv').config({ path: './../../.env' });
const { NODE_ENV, DB_TYPE, DB_URL, TEST_DB_URL } = process.env;

NODE_ENV !== 'production' && require('ts-node/register');

const configObj = (env = 'development') => ({
  client: DB_TYPE,
  connection: env === 'test' ? TEST_DB_URL : DB_URL,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './seeds'
  }
});

module.exports = {
  development: configObj('development'),
  test: configObj('test'),
  production: configObj('production')
};
