var models = require("../../models")

module.exports.create_authority = function (authority, callback) {
    models.Authorities.create(authority).then(function (response, error) {
        callback(response);
    }).catch(function (error) {
        callback(null, error);
    })
}

module.exports.getallauthority = function (callback) {
    models.Authorities.findAll({
        order:[
            ['role','DESC']
        ],
        include: [{
            model: models.Organizations,
            as: "organization"
        }]
    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        var errdata = { status: 500, stacktrace: error }
        callback(errdata)
    })
}

module.exports.getallauthoritybyOrg = function (authority, callback) {
    models.Authorities.findAll({
        where: { organizationUuid: authority, isDisabled: false },
        order:[
            ['role','DESC']
        ],
        include: [{
            model: models.Organizations,
            as: "organization"
        }]
    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        var errdata = { status: 500, stacktrace: error }
        callback(errdata)
    })
}

module.exports.getauthorityById = function (authority, callback) {
    models.Authorities.findAll({ where: { uuid: authority } , order:[
        ['role','DESC']
    ],}).then(function (response) {
        callback(response)
    }).catch(function (error) {
        var errdata = { status: 500, stacktrace: error }
        callback(errdata)
    })
}

module.exports.delete_authority = function (authority, callback) {
    models.Authorities.destroy({ where: { uuid: authority } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        var errdata = { status: 500, stacktrace: error }
        callback(errdata)
    })
}

module.exports.disable_authority = function (authority, callback) {

    var selector = { where: { uuid: authority } }
    models.Authorities.findOne(selector).then(function (response) {
        var value = response.dataValues;
        value.isDisabled = true;

        models.Authorities.update(value, selector).then(function (response) {
            callback(response)
        }).catch(function (err) {
            callback(err);
        })
    })
}

module.exports.update_authority = function (authority, callback) {
    models.Authorities.update(authority, { where: { uuid: authority.uuid } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        var errdata = { status: 500, stacktrace: error }
        callback(errdata)
    })
}

module.exports.get_Role = function (role,orgid, callback) {
    console.log(role,orgid)
    models.Authorities.findAll({ where: { role: role , organizationUuid : orgid }, order:[
        ['role','DESC']
    ], }).then(function (response) {
        console.log(response.length)
        if (response.length === 1) {
            callback(response)
        } else {
            callback(null)
        }
    }).catch(function (err) {
        callback(err);
    })
}

module.exports.get_RoleNoOrg = function (role, callback) {
    console.log(role)
    models.Authorities.findAll({ where: { role: role }, order:[
        ['role','DESC']
    ], }).then(function (response) {
        console.log(response.length)
        var result = [];
        if (response.length > 0) {
            for(var i =0; i< response.length; i++){
                console.log(response[i].dataValues)
                if(response[i].dataValues.organizationUuid === null){
                    result.push(response[i].dataValues)
                    if(result.length === 1){
                        callback(result)
                    }
                }
            }
            
        } else {
            callback(null)
        }
    }).catch(function (err) {
        callback(err);
    })
}