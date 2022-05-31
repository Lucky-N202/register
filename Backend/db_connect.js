const { Pool } = require("pg");

const pool = new Pool({
  user: "adelaide",
  host: "129.232.211.166",
  password: "password123",
  database: "ontime",
  port: 5432,
});

console.log("The pool is open");
module.exports = pool;