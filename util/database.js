const mysql = require("mysql2");
require("dotenv").config();

console.log("DB", process.env.SQL_DATABASE);
const PASSWORD = process.env.PASSWORD || "Qazzaq1@#";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: process.env.SQL_DATABASE,
  password: PASSWORD,
  //   waitForConnections: true,
  //   connectionLimit: 10,
  //   maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  //   idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  //   queueLimit: 0,
  //   enableKeepAlive: true,
  //   keepAliveInitialDelay: 0,
});

module.exports = pool.promise();
