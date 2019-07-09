import knex from 'knex';

const { env = 'development' } = process.env;
const config = require('./knexfile')[env];

export default knex(config);
