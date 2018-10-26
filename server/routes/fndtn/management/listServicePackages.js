var config = require('../../../config');

var express = require('express');
var router = express.Router();
var fs = require('fs');

function listPath(req, res, next){
    var path = (req.params.path ? req.params.path.replace(/\./g,'/') : '');
    var list = [];
    fs.readdirSync(path).forEach((name) => {
        var node = {
            name:name,
            parentPath:path,
            hasChildren:fs.statSync(path+"/"+name).isDirectory()
        };
        if(node.hasChildren){
            node.children = [];
            node.isOpen = false;
            list.push(node);
        } else {
            if(name.endsWith('.js')){
                node.path = path+'/'+name;
                node.url = '/'+path+'/'+name.substr(0,name.length-3);
                list.push(node);
            }
        }
    });
    res.json(list);
}

router.get('/', listPath);
router.get('/:path', listPath);

module.exports = router;
