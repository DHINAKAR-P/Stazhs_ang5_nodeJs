var models = require("../../models")

module.exports.createGroupUser = function (GroupUserDetails, callback) {
    models.GroupUsers.create({
        GroupUuid: GroupUserDetails.GroupUuid,
        UserUuid: GroupUserDetails.UserUuid
    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getallgroupuser = function (callback) {
    models.GroupUsers.findAll().then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.update_GroupUser = function (GroupUserDetails, callback) {
    models.GroupUsers.update({ where: { GroupUuid: GroupUserDetails.uuid } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getGroupUserById = function (GroupUserDetails, callback) {
    models.GroupUsers.findAll({ where: { GroupUuid: GroupUserDetails } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.delete_GroupUser = function (User_Id, Group_Id, callback) {
    models.GroupUsers.destroy({ where: { UserUuid: User_Id, GroupUuid: Group_Id } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}