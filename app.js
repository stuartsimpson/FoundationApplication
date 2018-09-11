var express = require('express');

var app = module.exports = express();

require('./server/modules/application')();
