'use strict';

const express = require('express');
const mysql = require('mysql');

const PORT = 8080;
const HOST = '0.0.0.0';

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

const app = express();

app.get('/', (req, res) => {
  connection.query('show databases;', (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(PORT, HOST);
