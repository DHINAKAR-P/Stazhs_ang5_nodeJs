var OrganizationDao = require("../../daos/organization/OrganizationDao")

module.exports.createOrganization = function (OrganizationDetails, callback) {
    OrganizationDao.createOrganization(OrganizationDetails, function(response){
        callback(response);
    })
}

module.exports.getallOrganization = function (callback) {
    OrganizationDao.getallOrganization(function(response){
        callback(response)
    })
}

module.exports.getOrganizationById = function (Organisation_id, callback) {
    OrganizationDao.getOrganizationById(Organisation_id,function(response){
        callback(response)
    })
}

module.exports.delete_Organisation = function (Organisation_id, callback) {
    OrganizationDao.delete_Organisation(Organisation_id, function () {
       callback();
    });
}

module.exports.update_Organisation = function (OrganizationDetails, callback) {
    OrganizationDao.update_Organisation(OrganizationDetails, function (response) {
        callback(response)
    });
}