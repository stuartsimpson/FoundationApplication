var mongodb = require('mongodb');

var config = require('../config');

module.exports = function(app){
    'use strict';
    return mongodb.MongoClient.connect(
                'mongodb://'+config.env.mongo.host+
                ':'+config.env.mongo.port+
                '/'+config.env.mongo.db)
        .then(function(client){
            config.env.logger.info('Step 1 - storage.init');
            config.env.setAttribute('app.db', client.db(config.env.mongo.db));
            return(true);
        }).catch( (error) => {
            config.env.logger.error('Faild storage connection: ', error);
        });
};
