'use strict';

var response = require('../res');
var connection = require('../conn');

exports.index = function(req, res) {
    response.ok("Welcome to Farah's RESTful API", res)
};