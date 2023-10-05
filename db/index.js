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
  if (error) {
    if (error.code === "PROTOCOL_CONNECTION_LOST") {
      console.log("Database connection was closed.");
    } else if (error.code === "ER_CON_COUNT_ERROR") {
      console.log("Database has too many connections.");
    } else if (error.code === "ECONNREFUSED") {
      console.log("Database connection was refused.");
    } else if (error.code == "ER_NOT_SUPPORTED_AUTH_MODE") {
      console.log(
        "MySQL client does not support authentication protocol requested by server."
      );
    } else {
      console.log("Connecting database: " + error.code);
    }
  }
  if (connection) connection.release();
  return;
});

module.exports = db;
