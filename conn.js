var mysql = require('mysql');

var con = mysql.createConnection({
  host: "db",
  user: "admin",
  password: "admincom",
  database: "fscom"
});


con.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to the database');
});

module.exports = con;