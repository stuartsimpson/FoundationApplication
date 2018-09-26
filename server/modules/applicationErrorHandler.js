'use strict';

var config = require('../config');

var applicationErrorHandler = {
    errors: {},
    getError: function(type, number){
        var that = this;
        return(new Promise(function(resolve){
            var error = that.errors[type+'-'+number];
            if(error){
                resolve(error);
            } else {
                var collection = config.app.db.collection(config.collections.applicationErrors);

                collection.findOne({ number: number, type: type }, function(error, appError){
                    if(error || !appError){
                        resolve({
                            type:'DFU',
                            number:1000,
                            message:'The error '+type+'-'+number+' has not been defind in the application.'
                        });
                    } else {
                        that.errors[appError.type+'-'+appError.number] = appError;
                        resolve(appError);
                    }
                });
            }
        }));
    }
};

module.exports = applicationErrorHandler;
