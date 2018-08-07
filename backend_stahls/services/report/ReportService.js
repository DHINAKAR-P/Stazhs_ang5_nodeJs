var ReportDao = require("../../daos/report/ReportsDao")
var UserReports = require("../../daos/user/UserReportsDao")
var GroupReports = require("../../daos/group/GroupReportsDao")
var async = require("async")

module.exports.create_report = function (ReportDetails, callback) {
    ReportDao.create_report(ReportDetails, function (response) {
        callback(response)
    })
}

module.exports.getallreport = function (callback) {
    ReportDao.getallreport(function (response) {
        callback(response)
    })
}

module.exports.getreportById = function (Report_Id, callback) {
    ReportDao.getreportById(Report_Id, function (response) {
        callback(response)
    })
}

module.exports.getreportByUser = function (User_Id, callback) {
    var responsedata = []
    var count = 0;
    UserReports.getByUserId(User_Id, function (response) {
        async.forEach(response, function (data, callback) {
            ReportDao.getreportByUser(data.dataValues.ReportUuid, function (data) {
                count++
                responsedata.push(data)
                if (response.length === count) {
                    callback(responsedata)
                }
            })
        }, function (err) {
            callback(err)
        })
    })
}

module.exports.getreportbyorganization = function (OrganizationId, callback) {
    ReportDao.getreportbyorganization(OrganizationId, function (response) {
        callback(response)
    })
}

module.exports.delete_report = function (Report_Id, callback) {
    ReportDao.delete_report(Report_Id, function (response) {
        callback(response)
    })
}

module.exports.update_report = function (ReportDetails, callback) {
    ReportDao.update_report(ReportDetails, function (response) {
        callback(response)
    })
}

module.exports.assing_user = function (data, callback) {
    UserReports.assing_user(data, function (response) {
       callback(response)
    })
}

module.exports.remove_user = function (data, callback) {
    UserReports.remove_user(data, function (response) {
       callback(response)
    })
}

module.exports.assing_group = function (data, callback) {
    
    GroupReports.assing_group(data, function (response) {
        callback(response)
    })
}

module.exports.remove_group = function (data, callback) {
    
    GroupReports.remove_group(data, function (response) {
        callback(response)
    })
}
