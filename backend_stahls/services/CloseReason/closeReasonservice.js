var CloseReasonDao = require('../../daos/CloseReason/closeReasondao');

module.exports.closereason = function(closereason,callback){
    CloseReasonDao.closereason(closereason,function(response){
        callback(response);
    });
},

module.exports.getreason = function(callback){
    CloseReasonDao.reason(function(response){
        callback(response);
    });
}