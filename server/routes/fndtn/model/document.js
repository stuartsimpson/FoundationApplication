var express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

var config = require('../../../config.js');
var modelList = {};

function loadDataModel(model){
  if(!modelList[model]){
    let schemaDefinition = require(`../../../../schema/${model}.js`);
    let mongooseSchema = new mongoose.Schema(modelList[model], {collection: model});
    modelList[model] = mongoose.model(model, mongooseSchema);
  };
  return(modelList[model]);
}

/**
 * _find will search the MongoDB for the specified URL specified params:
 * req.params.model
 * the req.body can contain the following JSON elements:
 * query - MongoDB query object
 * projection - MongoDB projection object
 * options - MongoDB options object
 * The model must be defined in FoundationApplication/schema prior to using this
 * service.
 * @param       {Object}   req  http request object
 * @param       {Object}   res  http response object
 * @param       {Object} next unused
  */
function _find(req, res, next){
  try {
    let mongooseModel = loadDataModel(req.params.model);

    mongooseModel.find(req.body.query, req.body.projection, req.body.options, (error, docs) => {
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
  if((/[^a-z0-9]+/g).test(req.params.id)){
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify(new Error('Malformed parameter can not process request.')));
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
    if(req.body.data){
      let mongooseModel = loadDataModel(req.params.model);

      mongooseModel.create(req.body.data, req.body.options, (error, doc)=>{
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
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(400);
      res.send(JSON.stringify(new Error(`req.body.data undefined for ${req.params.model}`)));
    }
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
    res.send(JSON.stringify(new Error('Malformed parameter can not process request.')));
  } else if(!req.body.data){
    res.setHeader('Content-Type', 'application/json');
    res.status(400);
    res.send(JSON.stringify(new Error(`req.body.data undefined for ${req.params.model}`)));
  } else {
    try {
      let mongooseModel = loadDataModel(req.params.model);

      if(req.params.id !== doc._id){
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(new Error('req.params.id does not match doc._id'));
      } else {
        mongooseModel.update(req.body.data, (error, response)=>{
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
    res.send(JSON.stringify(new Error('Malformed parameter can not process request.')));
  } else {
    let mongooseModel = loadDataModel(req.params.model);

    mongooseModel.deleteOne({_id:req.params.id},(error) =>{
      if(error){
        res.setHeader('Content-Type', 'application/json');
        res.status(400);
        res.send(JSON.stringify(error));
      } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200);
        res.send(JSON.stringify({_id: req.params.id, status:'deleted' }));
      }
    });
  }
};

router.get('/findById/:model/:id', _findById);
router.post('/find/:model', _find);
router.put('/:model/:id', _update);
router.post('/:model', _insert);
router.delete('/:model/:id', _delete);

module.exports = router;
