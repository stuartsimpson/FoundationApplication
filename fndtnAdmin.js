const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const config = require('./server/config.js');

var fileList = [];

function listDirectory(dir, list){
  var files = fs.readdirSync(dir);
  files.forEach( file=>{
      if(fs.lstatSync(dir+'/'+file).isDirectory()){
        listDirectory(dir+'/'+file, list);
      } else {
        process.stdout.write('.');
        list.push(dir+'/'+file);
      }
  });
  return(list);
}

function loadRoutes(){

}

fileList = listDirectory('./server/routes', fileList);
console.log('Done');

fileList.forEach( file =>{
  console.log(file);
});
