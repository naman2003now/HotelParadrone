const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "01000101",
    port: 5432,
    database: "postgres",
});

module.exports = pool;
