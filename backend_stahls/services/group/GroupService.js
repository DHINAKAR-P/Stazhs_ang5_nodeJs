var GroupDao = require("../../daos/group/GroupDao")
var GroupReportsDao = require("../../daos/group/GroupReportsDao")
var async = require("async")

module.exports.creategroup = function (GroupDetails, callback) {
    GroupDao.creategroup(GroupDetails ,function(response){
        callback(response)
    })
}

module.exports.getallgroup = function (callback) {
    GroupDao.getallgroup(function(response){
        callback(response)
    })
}

module.exports.getGroupById = function (Group_id, callback) {
    GroupDao.getGroupById(Group_id, function (response) {
      callback(response)
    })
}

module.exports.getGroupByOrganizationId = function (OrganizationId, callback) {
    GroupDao.getGroupByOrganizationId(OrganizationId, function (response) {
      callback(response)
    })
}

module.exports.delete_Group = function (Group_id, callback) {
    GroupDao.delete_Group(Group_id, function (response) {
        callback(response)
    });
}

module.exports.update_Group = function (Group, callback) {
    GroupDao.update_Group(Group, function (response) {
        callback(response)
    });
}

module.exports.getgroupByreport = function (Report_id, callback) {
    var responsedata = []
    var count = 0;
    GroupReportsDao.getByReportId(Report_id, function (response) {
        async.forEach(response, function (data, callback) {
            GroupDao.getGroupById(data.dataValues.GroupUuid, function (data) {
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