var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

var config = require('../../../config.js');
var modelList = {};

function loadDataModel(model){
  if(!modelList[req.params.model]){
    modelList[req.params.model] = require(`../../../../schema/${req.params.model}.js`);
  };
  var mongooseSchema = new mongoose.Schema(modelList[req.params.model]);
  return(mongoose.model(req.params.model, mongooseSchema));
}

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _find(req, res, next){
  let mongooseModel = loadDataModel(req.params.model);

  try {
    let query = JSON.parse(req.body.query);
    let projection = JSON.parse(req.body.projection);
    let options = JSON.parse(req.body.options);

    mongooseModel.find(query, projection, options, (error, docs) => {
      if(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send(JSON.stringify(error));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200)
        res.send(JSON.stringify(docs));
      }
    });
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400)
    res.send(JSON.stringify(e));
  }
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _findById(req, res, next){
  if(req.params.id.search(/[^a-z0-9]+/g)){
    res.setHeader('Content-Type', 'application/json');
    res.status(400)
    res.send(JSON.stringify(error));
  } else {
    let mongooseModel = loadDataModel(req.params.model);

    mongooseModel.findById(req.params.id,(error, doc) =>{
      if(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(400)
        res.send(JSON.stringify(error));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200)
        res.send(JSON.stringify(doc));
      }
    });
  }

};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _insert(req, res, next) {
  let mongooseModel = loadDataModel(req.params.model);
  let doc = JSON.parse(req.body.data);
  let options = JSON.parse(req.body.options);

  mongooseModel.create(doc, options, (error, doc)=>{
    if(error){
      res.setHeader('Content-Type', 'application/json');
      res.status(400)
      res.send(JSON.stringify(error));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(200)
      res.send(JSON.stringify(doc));
    }
  })
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _update(req, res, next) {
  res.send('//todo: Need to create the generic _update service for persisting data models')
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _delete(req, res, next) {
  res.send('//todo: Need to create the generic _delete service for persisting data models')
};

router.get('/findById/:model/:id', _findById);
router.get('/find/:model', _find);
router.put('/:model/:id', _update);
router.post('/:model', _insert);
router.delete('/:model/:id', _delete);

module.exports = router;
