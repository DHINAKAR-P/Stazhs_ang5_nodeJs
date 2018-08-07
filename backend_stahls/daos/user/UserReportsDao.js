var models = require("../../models")
var async = require("async")

module.exports.assing_user = function (data, callback) {
    var reportid = data.ReportUuid;
    var userid = data.UserUuid;
    async.forEach(userid, function (data, callback) {
        models.UserReports.create({
            UserUuid: data,
            ReportUuid: reportid
        }).then(function (response) {
                callback(response);
            
        })
    },function(error){
        callback(error)
    }
)}


module.exports.remove_user = function (data, callback) {
    var reportid = data.ReportUuid;
    var userid = data.UserUuid;
    async.forEach(userid, function (data, callback) {
        models.UserReports.destroy({
            where:{
                UserUuid: data,
                ReportUuid: reportid
            }
        }).then(function (response) {
                callback(response);
            
        })
    },function(error){
        callback(error)
    }
)}


 module.exports.getByUserId = function (UserId, callback) {
    
    models.UserReports.findAll({where:{UserUuid:UserId}}).then(function(response){
        callback(response)
    }).catch(function(error){
        callback(error)
    })
 }

 module.exports.getByReportId = function (ReportId, callback) {
    
    models.UserReports.findById({where:{ReportUuid:ReportId}}).then(function(response){
        callback(response)
    }).catch(function(error){
        callback(error)
    })
 }

 module.exports.getById = function (Report_id, callback) {
    models.UserReports.findAll({where:{ReportUuid:Report_id}}).then(function(response) {
        callback(response)
    })
}

module.exports.getByUserId = function (User_Id, callback) {
    models.UserReports.findAll({where:{UserUuid:User_Id}}).then(function(response) {
        callback(response)
    })
}