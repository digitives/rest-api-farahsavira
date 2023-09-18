var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    cors = require('cors');

// const express = require('express');
// const app = express();
// const port = process.env.PORT || 8080;
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const mysql = require('mysql'); // Import the MySQL module

const httpProxy = require('http-proxy')
// var proxy = httpProxy.createProxyServer(options);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Thanks Kiddy!, RESTful API server started on: ' + port);
