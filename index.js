var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    bodyParser = require('body-parser'),
    cors = require('cors');

var httpProxy = require('http-proxy')
// var proxy = httpProxy.createProxyServer(options);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Thanks Kiddy!, RESTful API server started on: ' + port);