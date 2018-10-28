const path = require('path');
const fs = require('fs');
const readline = require('readline');
const mongoose = require('mongoose');
const { exec } = require('child_process');

const config = require('./server/config.js');

function listDirectory(dir, list) {
    var files = fs.readdirSync(dir);
    files.forEach(file => {
        if (fs.lstatSync(dir + '/' + file).isDirectory()) {
            listDirectory(dir + '/' + file, list);
        } else {
            process.stdout.write('.');
            list.push(dir + '/' + file);
        }
    });
    return (list);
}

function fixRecord(line) {
    let oidRegX = new RegExp(/\{\"\$oid\"\:\"([a-z,0-9]+)\"\}/g);
    let dateRegX = new RegExp(/\{\"\$date\"\:\"([,0-9,\-,T,:\.,Z]+)\"\}/g);
    let newLine = line.replace(oidRegX, (match, p1) => {
        return (`"${p1}"`)
    });
    newLine = newLine.replace(dateRegX, (match, p1) => {
        return (`"${p1}"`)
    });
    return (newLine);
}

function loadSeedData(model) {
    mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`, {useNewUrlParser: true});
    var db = mongoose.connection;
    var dynamicSchema = require(`./schema/${model}.js`);
    var mongooseSchema = new mongoose.Schema(dynamicSchema, {collection: model});
    var mongooseModel = mongoose.model(model, mongooseSchema);

    var loadFile = readline.createInterface({
        input: fs.createReadStream(`./seedData/${model}.json`)
    })

    loadFile.on('line', (line) => {
        line = fixRecord(line);
        var tempJSON = JSON.parse(line);
        var record = new mongooseModel(tempJSON);
        if(tempJSON._id){
            record.save((error, record) => {
                if (error) {
                    console.log('unable to load record to mongodb');
                    console.log(error.message);
                } else {
                    console.log(`${model}: ${record._id} loaded to mongodb`);
                }
            });
        } else {
            mongooseModel.insertMany([tempJSON], (error, records) => {
                if(error){
                    console.log('unable to create record in mongodb');
                    console.log(error.message);
                } else {
                    console.log(`${model}: ${records[0]._id} loaded to mongodb`);
                }
            })
        }
    }).on('close', (line) => {
        if (line) {
            console.log('record not processed');
            console.log(JSON.parse(line));
        }
        console.log('EOF');
        db.close();
    });
}

function clearSeedData(model) {
    mongoose.connect(`mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.db}`, {useNewUrlParser: true});
    var db = mongoose.connection;
    var dynamicSchema = require(`./schema/${model}.js`);
    var mongooseSchema = new mongoose.Schema(dynamicSchema, {collection: model});
    var mongooseModel = mongoose.model(model, mongooseSchema);

    mongooseModel.deleteMany({}, (error) => {
        if (error) {
            console.log(`error clearing seed data: ${error.message}`);
        } else {
            console.log(`seed datat deleted for ${model}`);
        }
        db.close();
    });
}

function exportSeedData(model){
    // TODO: Need to change the mongoexport command to a variable in either the config file or in the fndtnAdmin script
    exec(`mongoexport.exe --db ${config.mongo.db} --collection ${model} --out ./seedData/${model}.json`, (error, stdout, stderr) => {
        if(error) {
            console.log(`Could not export Seed Data: ${model}`);
            console.log(error);
        } else {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        }
    })
}

switch (process.argv[2]) {
    case 'loadSeedData':
        {
            loadSeedData(process.argv[3]);
            break;
        }
    case 'clearSeedData':
        {
            clearSeedData(process.argv[3]);
            break;
        }
    case 'exportSeedData':
        {
            exportSeedData(process.argv[3]);
            break;
        }
    case 'loadAllSeedData':
        {
            loadSeedData('fndtnAccessControl');
            loadSeedData('fndtnApplicationErrors');
            loadSeedData('fndtnMenus');
            loadSeedData('fndtnResources');
            loadSeedData('fndtnRoleResources');
            loadSeedData('fndtnRoles');
            loadSeedData('fndtnUsers');
            break;
        }
    case 'clearAllSeedData':
        {
            clearSeedData('fndtnAccessControl');
            clearSeedData('fndtnApplicationErrors');
            clearSeedData('fndtnMenus');
            clearSeedData('fndtnResources');
            clearSeedData('fndtnRoleResources');
            clearSeedData('fndtnRoles');
            clearSeedData('fndtnUsers');
            break;
        }
    case 'exportAllSeedData':
        {
            exportSeedData('fndtnAccessControl');
            exportSeedData('fndtnApplicationErrors');
            exportSeedData('fndtnMenus');
            exportSeedData('fndtnResources');
            exportSeedData('fndtnRoleResources');
            exportSeedData('fndtnRoles');
            exportSeedData('fndtnUsers');
            break;
        }
    default:
        {
            console.log('// TODO: need to add fndtnAdmin');
        }
}
