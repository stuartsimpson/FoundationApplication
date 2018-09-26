var neo4j = require('neo4j-driver').v1;

var config = require('../config');

const neo4jConnection = {
  get: ()=>{
    if(config.app.neo4j){
      config.setAttribute('app.neo4j', neo4j.driver(
        config.neo4j.protocol+
        config.neo4j.host,
        neo4j.auth.basic(
          config.neo4j.username,
          config.neo4j.password
        ),
        config.neo4j.driverConfig
      ));
    }

    return(config.neo4j.driver.session());
  }
}

module.exports = neo4jConnection;
