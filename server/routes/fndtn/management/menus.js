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

module.exports = router;
