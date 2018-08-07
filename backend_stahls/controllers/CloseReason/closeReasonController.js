var closeResservice = require('../../services/CloseReason/closeReasonservice');

module.exports.closeReason = function(req,res){
    var closereason = req.body;
    closeResservice.closereason(closereason,function(response){
        res.json(response);
        res.status(201);
    });
},

module.exports.reason = function(req,res){
    closeResservice.getreason(function(response){
        res.json(response);
        res.status(200);
    });
}