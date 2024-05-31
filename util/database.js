const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node-complete", // (schema made in workbench),
  password: "Noderoot@123",
});

module.exports = pool.promise(); // This will allow us to use promises when wokring with these connections to handle async tasks, async data instead of callbacks because promises allows us to write code in bit structured way
