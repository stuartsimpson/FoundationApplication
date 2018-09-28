var config = require('../config');
var applicationErrorHandler = require('./applicationErrorHandler');
var app = require('../../app');

module.exports = function(routerInit){
    'use strict';

    config.logger.info('Step 4 - error.init');

    app.use(function(req, res, next) {
        var kvp=req.url.substr(1).split('/');
        if(kvp[0]!=='error'){
            next({message:'uncontroled error.', status:404});
        } else {
            applicationErrorHandler.getError(kvp[1],parseInt(kvp[2])).then(
                (error) => {
                    next(error);
                }
            );
        }
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            config.logger.info('Development Error Loging');
            res.status(err.status || 500);
            res.send('error', {
            message: err.message,
            error: err
        });
      });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send('error', {
            message: err.message,
            error: {}
        });
    });
    return(true);
};
