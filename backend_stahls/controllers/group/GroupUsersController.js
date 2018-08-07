var GroupUsersService = require("../../services/group/GroupUsersService")

module.exports.createGroupUser = function (req, res) {
    var groupid = req.body.groupid;
    var userid = req.body.userid;
    var GroupUserDetails = {
        GroupUuid:groupid,
        UserUuid:userid
    }
    GroupUsersService.createGroupUser(GroupUserDetails , function(response){
        res.json(response);
        res.status(201);
    })
}

module.exports.getallgroupuser = function (req,res) {
    GroupUsersService.getallgroupuser(function(response){
        res.json(response);
        res.status(200);
    })
}

module.exports.update_GroupUser = function (req,res) {
    var GroupUserDetails = req.body;
    GroupUsersService.update_GroupUser(GroupUserDetails, function(response){
        res.json(response);
        res.status(201);
    })
}

module.exports.getGroupUserById = function (req,res) {
    var GroupUserDetails = req.params.uuid;
    GroupUsersService.getGroupUserById(GroupUserDetails, function(response){
        res.json(response);
        res.status(201);
    })
}

module.exports.delete_GroupUser = function (req, res) {
    var User_Id = req.params.userid;
    var Group_Id = req.params.groupid
    GroupUsersService.delete_GroupUser(User_Id,Group_Id, function(response){
        res.json(response);
        res.status(201);
    })
}


