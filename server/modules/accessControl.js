var jwt = require('jsonwebtoken');
var mongodb = require('mongodb');

var config = require('../config');
var applicationErrorHandler = require('./applicationErrorHandler');
var acl = require('./accessControlList');

function accessControl(req, res, next) {
    var resource = acl.getResourceId(req.url);
    var collection = config.app.db.collection(config.collections.accessControl);

    if(!resource._id){
        config.logger.error("AccessControl:Resource not registerd:" + req.url );
    } else {
        config.logger.debug("AccessControl:Resource._id:" + resource._id );
    }

    if(resource._public || true){
        //Access Granted
        next();
    } else {
        jwt.verify(req.cookies.authenticationToken, config.jwt.cert.private, function(error, decoded){
            if(error){
                if(resource._static){
                    res.cookie('destinationURL', req.url);
                    res.redirect("/Login");
                } else {
                    applicationErrorHandler.getError('APP',1002).then(
                        (error) => {
                            config.logger.warn(error);
                            res.status(401).send(error);
                        }
                    );
                }
            } else {
                if(resource._protected){
                    var query = {
                        resourceId : resource._id,
                        userId : new mongodb.ObjectId(decoded.data._id)
                    };

                    query[req.method.toLowerCase()] = true;

                    collection.count(query, function(error, count){
                       if(count>0){
                            //Access Granted
                           next();
                       } else {
                            if(resource._static){
                                res.redirect("/");
                            } else {
                                applicationErrorHandler.getError('APP',1001).then(
                                    (error) => {
                                        config.logger.warn(error);
                                        res.status(401).send(error);
                                    }
                                );
                            }
                       }
                    });
                } else {
                    //Access Granted
                    next();
                }
            }
        });
    }
}

module.exports = accessControl;
