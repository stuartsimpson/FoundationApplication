var config = require('../../../config');

var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

function findRecords(req, res, next) {
    var collection = config.app.db.collection(config.collections.roles);
    var query = {};
    if(req.body.name){
        query.file={$regex: ".*"+req.body.name+".*", $options:"i"};
    }

    collection.find(query).sort({name:1}).toArray(function(error, roles){
       if(error){
           res.json({roles: []});
       } else {
           res.json({roles: roles});
       }
    });
};

function saveRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.roles);
    var role = {};
    if( req.body._id !== '' ){
        role._id = new mongodb.ObjectId(req.body._id);
    };

    role.name = req.body.name;

    collection.save(role,function(error, role){
        if(error){
            res.json(error);
        } else {
            res.json(role);
        }
    });
};

function deleteRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.roles);
    collection.deleteOne({_id: new mongodb.ObjectId(req.params.roleId)}, function(error, result){
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
router.delete('/:roleId', deleteRecord);

module.exports = router;
