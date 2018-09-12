const path = require('path');
const fs = require('fs');

var fileList = [];

function listDirectory(dir){
  var files = fs.readdirSync(dir);
  files.forEach( file=>{
      if(fs.lstatSync(dir+'/'+file).isDirectory()){
        listDirectory(dir+'/'+file);
      } else {
        fileList.push(file);
        console.log('File: '+dir+'/'+file)
      }
  });
}

listDirectory('./server');

console.log(__dirname);
console.log(__filename);
