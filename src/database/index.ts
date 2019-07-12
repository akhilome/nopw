import dotenv from 'dotenv';
import knex from 'knex';
dotenv.config();

const { NODE_ENV: env = 'development' } = process.env;
const config = require('./knexfile')[env];

export default knex(config);
