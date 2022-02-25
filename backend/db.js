const {Pool} = require("pg");
const config = require("./config.json")

const pool = new Pool({
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    database: config.DATABASE_DB
});

module.exports = pool;
