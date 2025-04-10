const Pool = require("pg").Pool;

const pool = new Pool({
    user: process.env.PG_USER, // Your PostgreSQL username
    host: process.env.PG_HOST, // PostgreSQL server host (localhost if local)
    database: process.env.PG_DATABASE, // Your database name (e.g., TodoList)
    password: process.env.PG_PASSWORD, // Your PostgreSQL password
    port: process.env.PG_PORT, // Default PostgreSQL port is 5432
});

module.exports = pool;