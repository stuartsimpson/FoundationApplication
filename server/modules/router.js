var path = require('path');
var fs = require('fs');

var config = require('../config');
var acl = require('./accessControlList');

var app = require('../../app');

module.exports = function(middlewareInit){
    config.env.logger.info('Step 3 - resources.init');
    return(
        config.env.app.db.collection(config.env.collections.resources).find({}).toArray()
        .then(registerResources)
    );
};

function registerResources(resources){
    resources.forEach( function(resource){
        config.env.logger.debug('\tLoading Resource: '+resource.url);
        acl.addResourceToACL(resource.url, {_id : resource._id, _static: resource.static, _public: resource.public, _protected: resource.protected});
        if(!resource.static){
            if(fs.existsSync(path.join(config.env.path.routes, resource.file))){
                app.use(resource.url, require(path.join(config.env.path.routes,resource.file)));
            } else {
                config.env.logger.error('\tError Loading Resource:'+resource.url+'. Resource File does not exist.');
            }
        }
    });
    return(true);
}
