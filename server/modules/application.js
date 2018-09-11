var promise = require('bluebird');

var middleware = require('./middleware');
var storage = require('./storage');
var router = require('./router');
var error = require('./error');
var server = require('./server');

var app = require('../../app');

module.exports = function init(){
    'use strict';

    return promise.resolve()
            .then(storage)
            .then(middleware)
            .then(router)
            .then(error)
            .then(server)
            .catch(function(e){
                throw e;
            });
};
