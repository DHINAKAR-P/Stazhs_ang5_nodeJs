var logging = require("../../config/logger_level")
var fs = require('fs');
module.exports.createLogger = function(loggerDetails , callback){

var h = {
    "level":loggerDetails.level
}
var appRoot = process.env.PWD;

  fs.writeFile(appRoot+'/config/logger_level.json',JSON.stringify(h), function (err) {
    if (err) throw err;
  });
callback(logging);
}

module.exports.getLoggerLevel = function( callback){
var loglevel = logging;
callback(loglevel);
}
