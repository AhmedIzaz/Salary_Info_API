const mysql = require("mysql2");

const db = mysql.createPool({
  connectionLimit: 25,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

db.getConnection((error, connection) => {
  if (error) console.log("error happend during getConnection");
  if (connection) connection.release();
});

module.exports = db;
