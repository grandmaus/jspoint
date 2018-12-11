'use strict';

const express = require('express');

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
app.get('/', (req, res) => {
  console.log('received request');
  res.send('HELLO WORLD');
});

app.listen(PORT, HOST);
console.log(`Server is running on ${HOST}:${PORT}`);
