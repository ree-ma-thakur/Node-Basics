const Sequelize = require("sequelize");

// db, username, password, sequelize options
const sequelize = new Sequelize("node-complete", "root", "Noderoot@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
