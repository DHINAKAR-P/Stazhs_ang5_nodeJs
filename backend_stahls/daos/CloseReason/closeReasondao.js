var models = require('../../models');

module.exports.closereason = function (closereason,callback){
    models.CloseReason.create(closereason).then(function(response){
        callback(response);
    }).catch(function(error){
        callback(error);
    });
};

module.exports.reason = function(callback){
    models.CloseReason.findAll().then(function(response){
        callback(response);
    }).catch(function(error){
        callback(error);
    });
};