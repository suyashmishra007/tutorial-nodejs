const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "Qazzaq1@#", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
