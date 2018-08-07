var GroupService = require("../../services/group/GroupService")

/**
 * 
 * @param {UUID, Groupname} req 
 * @param {Create The Group With It's UUID} res 
 */
module.exports.creategroup = function (req, res) {
    var GroupDetails = req.body;
    GroupService.creategroup(GroupDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * 
 * @param {GET ALL} req 
 * @param {Getting The All Group Name From Group With Corresponding OrganizationId} res 
 */
module.exports.getallgroup = function (req, res) {
    GroupService.getallgroup(function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * 
 * @param {UUID} req 
 * @param {Getting The Particular Group Name Based On Group UUID With Corresponding Organization} res 
 */
module.exports.getGroupById = function (req, res) {
    var Group_id = req.params.uuid;
    GroupService.getGroupById(Group_id, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * 
 * @param {GroupId} req 
 * @param {Gettting Group Information Based On GroupId With The Corresponding Organization} res 
 */
module.exports.getGroupByOrganizationId = function (req, res) {
    var OrganizationId = req.params.uuid;
    GroupService.getGroupByOrganizationId(OrganizationId, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * 
 * @param {GroupId} req 
 * @param {Delete The Paticular Group Information Based On Group Id} res 
 */
module.exports.delete_Group = function (req, res) {
    var Group_id = req.params.uuid;
    GroupService.delete_Group(Group_id, function (response) {
        res.status(204);
        res.end();
    });
}

/**
 * 
 * @param {GroupId, GroupName} req 
 * @param {Update The All The Information For Group} res 
 */
module.exports.update_Group = function (req, res) {
    var Group = req.body;
    GroupService.update_Group(Group, function (response) {
        res.json(response);
        res.status(201);
    });
}

/**
 * 
 * @param {ReportId} req 
 * @param {Getting The Group Assigned By Report} res 
 */
module.exports.getgroupByreport = function (req, res) {
    var Report_id = req.params.uuid;
    GroupService.getgroupByreport(Report_id, function (response) {
        res.json(response);
        res.status(200);
    })
}