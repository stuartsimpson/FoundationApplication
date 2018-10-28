var path = require('path');
var fs = require('fs');

var config = require('../config');
var acl = require('./accessControlList');

var app = require('../../app');

module.exports = function(middlewareInit){
    config.logger.info('Step 3 - resources.init');
    return(
        config.app.db.collection(config.collections.resources).find({}).sort({static:1}).toArray()
        .then(registerResources)
    );
};

function registerResources(resources){
    resources.forEach( function(resource){
        config.logger.debug(`\tLoading ${resource.static?'Module':'Service'}: ${resource.url}`);
        acl.addResourceToACL(resource.url, {_id : resource._id, _static: resource.static, _public: resource.public, _protected: resource.protected});
        if(!resource.static){
            if(fs.existsSync(path.join(config.path.routes, resource.file))){
                app.use(resource.url, require(path.join(config.path.routes,resource.file)));
            } else {
                config.logger.error('\tError Loading Resource:'+resource.file+'. Resource File does not exist.');
            }
        }
    });
    return(true);
}
