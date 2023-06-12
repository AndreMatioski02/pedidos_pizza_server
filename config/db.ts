const mysql = require("mysql2");
require("dotenv").config();

export const db = mysql.createConnection({
  host: process.env.DATA_BASE_HOST,
  user: process.env.DATA_BASE_USER,
  password: process.env.DATA_BASE_PASSWORD,
  db: process.env.DATA_BASE_SCHEMA,
  port: process.env.DATA_BASE_PORT,
});
