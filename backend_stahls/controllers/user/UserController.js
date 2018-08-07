var UserService = require("../../services/user/UserService");

module.exports.createuser = function (req, res) {
    var UserDetails = req.body;
    UserService.createuser(UserDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getalluser = function (req, res) {
    UserService.getalluser(function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.getalluserbyid = function (req, res) {
    var UserID = req.params.uuid;
    UserService.getalluserbyid(UserID, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.updateuser = function (req, res) {
    var UserDetails = req.body;
    UserService.updateuser(UserDetails, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.deleteuser = function (req, res) {
    var UserID = req.params.uuid;
    UserService.deleteuser(UserID, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.disableuser = function (req, res) {
    var UserID = req.params.uuid;
    UserService.disableuser(UserID, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.getuserByrole = function (req, res) {
    var Authority_id = req.params.uuid;
    UserService.getuserByrole(Authority_id, function (response) {
        res.json(response);
        res.status(200);
    })
}


module.exports.getuserByreport = function (req, res) {
    var Report_id = req.params.uuid;
    UserService.getuserByreport(Report_id, function (response) {
        res.json(response);
        res.status(200);
    })
}


module.exports.getuserByOrganizationId = function (req, res) {
    var OrganizationId = req.params.uuid;
    UserService.getuserByOrganizationId(OrganizationId, function (response) {
        res.json(response);
        res.status(200);
    })
}


module.exports.getUserByGroup = function (req, res) {
    var Group_Id = req.params.uuid
    UserService.getUserByGroup(Group_Id, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.getallRoleTM = function (req, res) {
    UserService.getallRoleTM(function (response) {
        res.json(response);
        res.status(response);
    })
}

module.exports.getuser = function (req, res){
    var user = req.params.username
    UserService.getUser(user,function (response){
        res.json(response);
        res.status(200)
    })
}


