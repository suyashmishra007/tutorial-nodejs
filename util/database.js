const mysql = require("mysql2");
require("dotenv").config();

const PASSWORD = "Qazzaq1@#";

const pool = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
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
