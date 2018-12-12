const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.db_host,
  user: process.env.db_user,
  password: process.env.db_password
});

connection.connect(err => {
  if (err) {
    throw err;
  }
});
