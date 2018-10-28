var jwt = require('jsonwebtoken');
var mongodb = require('mongodb');
var express = require('express');

var config = require('../../../config');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("//todo: Need to migrate the menus Service");
});

function _loadUserMenus(req, res, next){
    jwt.verify(req.cookies.authenticationToken, config.jwt.cert.private, (error, decoded) => {
        if(error){

        } else {

        }
    });
}

function findRecords(req, res, next) {
    var collection = config.app.db.collection(config.collections.menus);
    var query = {};

    collection.find(query).sort({url:1}).toArray(function(error, menus){
       if(error){
           res.json({menus: []});
       } else {
           res.json({menus: menus});
       }
    });
};

function saveRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.menus);
    var menu = {};
    if( req.body._id !== '' ){
        menu._id = new mongodb.ObjectId(req.body._id);
    };

    menu.menuType = req.body.menuType;
    menu.resourceURL = req.body.resourceURL;
    menu.dispaly = req.body.dispaly;

    collection.save(menu,function(error, menu){
        if(error){
            res.json(error);
        } else {
            res.json(menu);
        }
    });
};

function deleteRecord(req, res, next) {
    var collection = config.app.db.collection(config.collections.menus);
    collection.deleteOne({_id: new mongodb.ObjectId(req.params.menuId)}, function(error, result){
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
router.delete('/:menuId', deleteRecord);

module.exports = router;
