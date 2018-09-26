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
  try {
    let mongooseModel = loadDataModel(req.params.model);

    let query = req.body.query?JSON.parse(req.body.query):undefined;
    let projection = req.body.projection?JSON.parse(req.body.projection):undefined;
    let options = req.body.options?JSON.parse(req.body.options):undefined;

    mongooseModel.find(query, projection, options, (error, docs) => {
      if(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(JSON.stringify(error));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(docs));
      }
    });
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify(e));
  }
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _findById(req, res, next){
  if(req.params.id.search(/[^a-z0-9]+/g)){
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(new Error('Malformed parameter can not process request.'));
  } else {
    let mongooseModel = loadDataModel(req.params.model);

    mongooseModel.findById(req.params.id,(error, doc) =>{
      if(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(JSON.stringify(error));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(doc));
      }
    });
  }
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _insert(req, res, next) {
  try {
    let mongooseModel = loadDataModel(req.params.model);

    let doc = req.body.data ?
      JSON.parse(req.body.data) :
      throw new Error(`req.body.data undefined for ${req.params.model}`);
    let options = req.body.options?JSON.parse(req.body.options):undefined;

    mongooseModel.create(doc, options, (error, doc)=>{
      if(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(JSON.stringify(error));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(doc));
      }
    });
  } catch (e) {
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify(e));
  }
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _update(req, res, next) {
  if(req.params.id.search(/[^a-z0-9]+/g)){
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(new Error('Malformed parameter can not process request.'));
  } else {
    try {
      let mongooseModel = loadDataModel(req.params.model);

      let doc = req.body.data ?
        JSON.parse(req.body.data) :
        throw new Error(`req.body.data undefined for ${req.params.model}`);

      if(req.params.id !== doc._id){
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(new Error('req.params.id does not match doc._id'));
      } else {
        mongooseModel.update(doc, (error, response)=>{
          if(error){
            res.setHeader('Content-Type', 'application/json');
            res.status(400);
            res.send(JSON.stringify(error));
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200);
            res.send(JSON.stringify(response));
          }
        });
      }
    } catch (e) {
      res.setHeader('Content-Type', 'application/json');
      res.status(400);
      res.send(JSON.stringify(e));
    }
  }
};

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------
function _delete(req, res, next) {
  if(req.params.id.search(/[^a-z0-9]+/g)){
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(new Error('Malformed parameter can not process request.'));
  } else {
    let mongooseModel = loadDataModel(req.params.model);

    mongooseModel.findById(req.params.id,(error, doc) =>{
      if(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(JSON.stringify(error));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify(doc));
      }
    });
  }
};

router.get('/findById/:model/:id', _findById);
router.get('/find/:model', _find);
router.put('/:model/:id', _update);
router.post('/:model', _insert);
router.delete('/:model/:id', _delete);

module.exports = router;
