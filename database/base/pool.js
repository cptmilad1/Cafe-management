require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: (process.env.PGPORT ? Number(process.env.PGPORT) : undefined) || 6000,
  database: process.env.PGDATABASE || "Cofe_Management",
  user: process.env.PGUSER ,
  password: process.env.PGPASSWORD || "postgres",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

module.exports = pool;