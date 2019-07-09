require('dotenv').config({ path: './../../.env' });
const { NODE_ENV, DB_TYPE, DB_URL, TEST_DB_URL } = process.env;

NODE_ENV !== 'production' && require('ts-node/register');

module.exports = {
  development: {
    client: DB_TYPE,
    connection: DB_URL,
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
  },
  test: {
    client: DB_TYPE,
    connection: TEST_DB_URL,
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
  },

  production: {
    client: DB_TYPE,
    connection: DB_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    }
  }
};
