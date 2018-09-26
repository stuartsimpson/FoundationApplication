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

    config.logger.info('Step 2 - middleware.init');
    config.setAttribute('jwt.cert', certParser.parsePrivate());
    config.setAttribute('sms.provider.client', twilio(config.sms.provider.accountId, config.sms.provider.authToken));

    // view engine setup
    app.set('views', config.path.views);
    app.set('view engine', 'pug');

    // uncomment after placing your favicon in /public
    app.use(favicon(config.server.favicon));
    app.use(logger(config.server.loggingLevel));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(accessControl);
    app.use(require('less-middleware')(config.path.public));
    app.use(express.static(config.path.public));
    return(true);
};
