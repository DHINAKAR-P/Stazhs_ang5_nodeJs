var OrganizationService = require("../../services/organization/OrganizationService")
/**
 * Create Organization 
 * @param {OrganizationName} req 
 * @param {Create The Organization Also With Reports,Groups } res 
 */
module.exports.creeateOrganization = function (req, res) {
    var OrganizationDetails = req.body;
    OrganizationService.createOrganization(OrganizationDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List Of Organization 
 * @param {GetAll} req 
 * @param {Getting The List Of Organzation Details From Organization} res 
 */
module.exports.getallOrganization = function (req, res) {
    OrganizationService.getallOrganization(function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List of Organization Based On OrganizationId
 * @param {OrganizationiD} req 
 * @param {Getting Particular Organiztion Details Based On OrganizationId} res 
 */
module.exports.getOrganizationById = function (req, res) {
    var Organisation_id = req.params.uuid;
    OrganizationService.getOrganizationById(Organisation_id, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Delete The Particular Organization Based on OrganizationId
 * @param {OrganizationId} req 
 * @param {Delete Paticular Organization Details Form Organization Based on OrganizationId} res 
 */
module.exports.delete_Organisation = function (req, res) {
    var Organisation_id = req.params.uuid;
    OrganizationService.delete_Organisation(Organisation_id, function () {
        res.status(204);
        res.end();
    });
}

/**
 * Update Particular Organization
 * @param {OrganizationId} req 
 * @param {Update Particular Organization Details Based On It's OrganizationId} res 
 */
module.exports.update_Organisation = function (req, res) {
    var OrganizationDetails = req.body;
    OrganizationService.update_Organisation(OrganizationDetails, function (response) {
        res.json(response);
        res.status(201);
    });
}