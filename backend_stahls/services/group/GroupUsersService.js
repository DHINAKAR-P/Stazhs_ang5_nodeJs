var GroupUsersDao = require("../../daos/group/GroupUsersDao")

module.exports.createGroupUser = function (GroupUserDetails, callback) {
    GroupUsersDao.createGroupUser(GroupUserDetails , function(response){
       callback(response)
    })
}


module.exports.getallgroupuser = function (callback) {
    GroupUsersDao.getallgroupuser(function(response){
        callback(response)
    })
}

module.exports.getGroupUserById = function (GroupUserDetails, callback) {
    GroupUsersDao.getGroupUserById(GroupUserDetails, function (response) {
      callback(response)
    })
}

module.exports.delete_GroupUser = function (User_Id,Group_Id, callback) {
    GroupUsersDao.delete_GroupUser(User_Id,Group_Id, function (response) {
        callback(response)
    });
}

module.exports.update_GroupUser = function (GroupUserDetails, callback) {
    GroupUsersDao.update_GroupUser(GroupUserDetails, function (response) {
        callback(response)
    });
}