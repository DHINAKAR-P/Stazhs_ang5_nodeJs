var UserDao = require("../../daos/user/UserDao")
var UserAuthoritiesDao = require("../../daos/user/UserAuthoritiesDao")
var AuthoritiesDao = require("../../daos/user/AuthoritiesDao");
var UserReportsDao = require("../../daos/user/UserReportsDao")
var GroupUserDao = require("../../daos/group/GroupUsersDao")
var async = require("async")

module.exports.createuser = function (UserDetails, callback) {
    UserDao.createuser(UserDetails, function (response) {
        callback(response);
    })
}

module.exports.getalluser = function (callback) {
    UserDao.getalluser(function (response) {
        callback(response);
    })
}

module.exports.getalluserbyid = function (UserID, callback) {
    UserDao.getalluserbyid(UserID, function (response) {
        callback(response);
    })
}

module.exports.updateuser = function (UserDetails, callback) {
    UserDao.updateuser(UserDetails, function (response) {
        callback(response);
    })
}

module.exports.deleteuser = function (UserID, callback) {
    UserDao.deleteuser(UserID, function (response) {
        callback(response);
    })
}

module.exports.disableuser = function (UserID, callback) {
    UserDao.disableuser(UserID, function (response) {
        callback(response);
    })
}

module.exports.getuserByrole = function (Authority_id, callback) {
    var responsedata = []
    var count = 0;
    UserAuthoritiesDao.getById(Authority_id, function (response) {
        async.forEach(response, function (data, callback) {
            UserDao.getalluserbyid(data.dataValues.UserUuid, function (data) {
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


module.exports.getuserByreport = function (Report_id, callback) {
    var responsedata = []
    var count = 0;
    UserReportsDao.getById(Report_id, function (response) {
        async.forEach(response, function (data, callback) {
            UserDao.getalluserbyid(data.dataValues.UserUuid, function (data) {
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

module.exports.getuserByOrganizationId = function (OrganizationId, callback) {
    UserDao.getuserByOrganizationId(OrganizationId, function (response) {
        callback(response);
    })
}

module.exports.getUserByGroup = function (Group_Id, callback) {
    var responsedata = []
    var count = 0;
    GroupUserDao.getGroupUserById(Group_Id, function (response) {
        async.forEach(response, function (data, callback) {
            UserDao.getalluserbyid(data.dataValues.UserUuid, function (data) {
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

module.exports.getallRoleTM = function (callback) {
    var responsedata = []
    var count = 0;
    AuthoritiesDao.getByRoleName("ROLE_TM", function (authoritiesData) {
        UserAuthoritiesDao.getById(authoritiesData.dataValues.uuid, function (userAuthoritiesData) {
            async.forEach(userAuthoritiesData, function (data, callback) {
                UserDao.getalluserbyid(data.dataValues.UserUuid, function (data) {
                    count++
                    responsedata.push(data)
                    if (userAuthoritiesData.length === count) {
                        callback(responsedata)
                    }
                })
            }, function (err) {
                callback(err)
            })
        })
    })
}

module.exports.getUser = function (user, callback) {
    UserDao.getUser(user, function (response) {
        callback(response);
    })
}
