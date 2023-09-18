'use strict';

var response = require('../res');
var connection = require('../conn');

exports.index = function(req, res) {
    response.ok("You are one curious monkey!", res)
};