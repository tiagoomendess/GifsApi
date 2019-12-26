const express = require('express');
const http = require('http');
var mongoose = require('mongoose');
var cors = require('cors');

const hostname = '127.0.0.1';
const port = 3000;
let router = require('./router');

var app = express();

app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });


app.use(router.initialize());

var config = { db: 'mongodb://localhost/tp2' };
mongoose.connect(config.db);

const server = http.Server(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
