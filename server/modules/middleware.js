var express      = require('express');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var fs           = require('fs');
var jwt          = require('express-jwt');
var twilio       = require('twilio');

var config = require('../config');
var certParser = require('./certParser');
var accessControl = require('./accessControl');

var app = require('../../app');

module.exports = function(storageInit){
    'use strict';

    config.env.logger.info('Step 2 - middleware.init');
    config.env.setAttribute('jwt.cert', certParser.parsePrivate());
    config.env.setAttribute('sms.provider.client', twilio(config.env.sms.provider.accountId, config.env.sms.provider.authToken));

    // view engine setup
    app.set('views', config.env.path.views);
    app.set('view engine', 'pug');

    // uncomment after placing your favicon in /public
    app.use(favicon(config.env.server.favicon));
    app.use(logger(config.env.server.loggingLevel));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(accessControl);
    app.use(require('less-middleware')(config.env.path.public));
    app.use(express.static(config.env.path.public));
    return(true);
};
