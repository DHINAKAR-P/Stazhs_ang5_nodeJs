var AuthorityService = require("../../services/authority/AuthoritiesService")

/**
 * Create Authority
 * @param {Role} req
 * @param {Create Authority Role} res
 */
module.exports.create_authority = function (req, res) {
    var authority = req.body;
    AuthorityService.create_authority(authority, function (response, error) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(response);
            res.status(201);
        }
    })
}
/**
 * Getting List Of Authority
 * @param {Get All} req
 * @param {Get The List Of Authority Role with UUID} res
 */
module.exports.getallauthority = function (req, res) {
    AuthorityService.getallauthority(function (response) {
        if (response.status == 500) {
            res.status(500).send(response);
        } else {
            res.json(response);
            res.status(201);
        }
    })
}

/**
 * Getting List Of Authority
 * @param {Get All by Organozation} req
 * @param {Get The List Of Organization Authority Role with UUID} res
 */
module.exports.getallauthoritybyOrg = function (req, res) {
    var authority = req.params.uuid;
    AuthorityService.getallauthoritybyOrg(authority, function (response) {
        if (response.status == 500) {
            res.status(500).send(response);
        } else {
            res.json(response);
            res.status(201);
        }
    })
}

/**
 * Getting Paticular Authority Base on UUID
 * @param {UUID} req
 * @param {Get The Authority Role And UUID Based on UUID} res
 */
module.exports.getauthorityById = function (req, res) {
    var authority = req.params.uuid;
    AuthorityService.getauthorityById(authority, function (response) {
        if (response.status == 500) {
            res.status(500).send(response);
        } else {
            res.json(response);
            res.status(201);
        }
    })
}

/**
 * Delete Autority For Paticular Authority
 * @param {UUID} req
 * @param {Delete Authority Role Based on UUID} res
 */
module.exports.delete_authority = function (req, res) {
    var authority = req.params.uuid;
    AuthorityService.delete_authority(authority, function (response) {
        if (response.status == 500) {
            res.status(500).send(response);
        } else {
            res.json(response);
            res.status(201);
        }
    })
}

/**
 * Disable Autority For Paticular Authority
 * @param {UUID} req
 * @param {Disable Authority Role Based on UUID} res
 */
module.exports.disable_authority = function (req, res) {
    var authority = req.params.uuid;
    AuthorityService.disable_authority(authority, function (response) {
        if (response.status == 500) {
            res.status(500).send(response);
        } else {
            res.json(response);
            res.status(201);
        }
    })
}

/**
 * Update Particular Authority
 * @param {Role,UUID} req
 * @param {Update the Authority Role,UUID} res
 */
module.exports.update_authority = function (req, res) {
    var authority = req.body;
    AuthorityService.update_authority(authority, function (response) {
        if (response.status == 500) {
            res.status(500).send(response);
        } else {
            res.json(response);
            res.status(201);
        }
    })
}

module.exports.get_Role = function (req, res) {
    var role = req.params.role;
    var orgid = req.params.orgid;
    console.log("controller--->", orgid)
    AuthorityService.get_Role(role, orgid, function (response) {
        res.json(response);
        res.status(200);
    })

}

module.exports.get_RoleNoOrg = function (req, res) {
    var role = req.params.role;
    console.log("controller--->", role)
    AuthorityService.get_RoleNoOrg(role, function (response) {
        res.json(response);
        res.status(200);
    })

}

