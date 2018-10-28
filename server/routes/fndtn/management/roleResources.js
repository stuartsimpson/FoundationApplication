var config = require('../../../config');

var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

function findByRoleId(req, res, next) {
    var collection = config.app.db.collection(config.collections.roleResources);
    var query = [
        {
            $match : {
                roleId:mongodb.ObjectId(req.params.id)
            }
        },
        {
            $lookup: {
                from:"fndtnResources",
                localField:"resourceId",
                foreignField:"_id",
                as:"resource"
            }
        },
        {
            $unwind:"$resource"
        }
    ];

    collection.aggregate(query).toArray(function(error, roleResources){
       if(error){
           res.json({roleResources: []});
       } else {
           res.json({roleResources: roleResources});
       }
    });
};

function saveRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.roleResources);
    var roleResource = {};

    if(req.body._id !== ''){
        roleResource._id = new mongodb.ObjectId(req.body._id);
    }

    roleResource.get = req.body.get;
    roleResource.pug = req.body.put;
    roleResource.post = req.body.post;
    roleResource.delete = req.body.delete;
    roleResource.resourceId = new mongodb.ObjectId(req.body.resourceId);
    roleResource.roleId = new mongodb.ObjectId(req.body.roleId);

    if( req.body._id !== '' ){
        roleResource._id = new mongodb.ObjectId(req.body._id);
    };

    collection.save(roleResource,function(error, roleResource){
        if(error){
            res.json(error);
        } else {
            res.json(roleResource);
        }
    });
};

function deleteRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.roleResources);
    collection.deleteOne({_id: new mongodb.ObjectId(req.params.id)}, function(error, result){
        if(error){
            res.json(error);
        }else{
            res.json(result);
        }
    });

};

router.get('/findByRoleId/:id', findByRoleId);
router.post('/', saveRecord);
router.put('/', saveRecord);
router.delete('/:id', deleteRecord);

module.exports = router;
