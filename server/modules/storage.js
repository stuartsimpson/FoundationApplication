var mongodb = require('mongodb');
var mongoose = require('mongoose');

var config = require('../config');

module.exports = function(app){
    'use strict';
    mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`,{useNewUrlParser: true});
    return mongodb.MongoClient.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`, {useNewUrlParser: true})
        .then(function(client){
            config.logger.info('Step 1 - storage.init');
            config.setAttribute('app.db', client.db(config.mongo.db));
            return(true);
        }).catch( (error) => {
            config.logger.error('Faild storage connection: ', error);
        });
};
