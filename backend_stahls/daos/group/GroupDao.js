var models = require("../../models")


module.exports.creategroup = function (GroupDetails, callback) {
    models.Groups.create(GroupDetails).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getallgroup = function (callback) {
    models.Groups.findAll({
        include: [{
            model: models.Organizations
        }]
    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getGroupById = function (Group_id, callback) {
    models.Groups.findById(Group_id, {
        include: [{
            model: models.Organizations
        }]
    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getGroupByOrganizationId = function (OrganizationId, callback) {
    models.Groups.findAll({
        where: { OrganizationUuid: OrganizationId },
        include: [{
            model: models.Organizations
        }]

    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.delete_Group = function (Group_id, callback) {
    models.Groups.destroy({ where: { uuid: Group_id } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.update_Group = function (Group, callback) {
    models.Groups.update(Group, { where: { uuid: Group.uuid } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}