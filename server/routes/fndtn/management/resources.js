var config = require('../../../config');

var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

function findRecords(req, res, next) {
    var collection = config.app.db.collection(config.collections.resources);
    var query = {};
    if(req.body.file){
        query.file={$regex: ".*"+req.body.file+".*", $options:"i"};
    }

    if(req.body.url){
        query.url={$regex: ".*"+req.body.url+".*", $options:"i"};
    }

    if(req.body.name){
        query.name={$regex: ".*"+req.body.name+".*", $options:"i"};
    }

    collection.find(query).sort({url:1}).toArray(function(error, resources){
       if(error){
           res.json({resources: []});
       } else {
           res.json({resources: resources});
       }
    });
};

function saveRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.resources);
    var resource = {};
    if( req.body._id !== '' ){
        resource._id = new mongodb.ObjectId(req.body._id);
    };

    resource.name = req.body.name;
    resource.file = req.body.file;
    resource.url = req.body.url;
    resource.static = req.body.static;
    resource.public = req.body.public;
    resource.protected = req.body.protected;

    collection.save(resource,function(error, resource){
        if(error){
            res.json(error);
        } else {
            res.json(resource);
        }
    });
};

function deleteRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.resources);
    collection.deleteOne({_id: new mongodb.ObjectId(req.params.resourceId)}, function(error, result){
        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    });

};

router.post('/find', findRecords);
//router.get('/:id', findRecord);
router.post('/', saveRecord);
router.put('/', saveRecord);
router.delete('/:resourceId', deleteRecord);

module.exports = router;
