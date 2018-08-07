var models = require("../../models")
var async = require("async")

module.exports.assing_group = function (data, callback) {
    
    var reportid = data.ReportUuid;
    var groupid = data.GroupUuid;
    async.forEach(groupid, function (data, callback) {
        models.GroupReports.create({
            GroupUuid: data,
            ReportUuid: reportid
        }).then(function (response) {
            callback(response);
            
        })
    },function(error){
        callback(error)
    }
)}

module.exports.remove_group = function (data, callback) {
    
    var reportid = data.ReportUuid;
    var groupid = data.GroupUuid;
    async.forEach(groupid, function (data, callback) {
        models.GroupReports.destroy({
            where:{
                GroupUuid: data,
                ReportUuid: reportid
            }
        }).then(function (response) {
            callback(response);
            
        })
    },function(error){
        callback(error)
    }
)}

 module.exports.getByGroupId = function (GroupId, callback) {
    
    models.GroupReports.findById({where:{GroupUuid:GroupId}}).then(function(response){
        callback(response)
    }).catch(function(error){
        callback(error)
    })
 }

 module.exports.getByReportId = function (ReportId, callback) {
    models.GroupReports.findAll({where:{ ReportUuid:ReportId }}).then(function(response){
        callback(response)
    }).catch(function(error){
        callback(error)
    })
 }

