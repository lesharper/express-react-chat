const config = require("../config.json");

const knex = require('knex')({
    client: 'postgresql',
    connection: {
        database: config.DATABASE_DB,
        user: config.DATABASE_USER,
        password: config.DATABASE_PASSWORD,
        port: config.DATABASE_PORT,
        host: config.DATABASE_HOST,
    },
    pool: {
        min: 0,
        max: 10
    },
});

module.exports = knex
