var loggerDao = require("../../daos/Logger/loggerInfoDao");

module.exports.createlogger = function(logger , callback){
    loggerDao.createLogger(logger , function(loggerDetails){
        callback(loggerDetails);
    })
}

module.exports.getLoggerLevel = function( callback){
    loggerDao.getLoggerLevel(function(logLevel){
        callback(logLevel)
    })
    
    }