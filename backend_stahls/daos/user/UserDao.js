var models = require("../../models")
var async = require("async")

module.exports.createuser = function (UserDetails, callback) {
    var responsedata;
    models.Users.create(UserDetails).then(function (response) {
        responsedata = response;
        async.forEach(UserDetails.Authorities, function (data, callback) {
            models.UserAuthorities.create({
                UserUuid: responsedata.uuid,
                AuthorityUuid: data.uuid
            }).then(function () {
                callback(responsedata)
            })
        }, function (err) {
            callback(err)
        })
    })
}

module.exports.getalluser = function (callback) {
    models.Users.findAll({
        where: { isDisabled: false },
        order:[
            ['firstname','DESC']
        ],
        include: [{
            model: models.Organizations,
            as: "organization"
        },
        {
            model: models.Authorities,
            as: "Authorities",
            required: false,
            attributes: ['uuid', 'role'],
            through: { attributes: [] }
        }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        }
        else {
            callback("There is no users")
        }
    }).catch(function (err) {
        callback(err);
    })
}

module.exports.getalluserbyid = function (UserID, callback) {
    models.Users.findOne({
        where: { uuid: UserID },
        order:[
            ['firstname','DESC']
        ],
        include: [{
            model: models.Organizations,
            as: "organization"
        },
        {
            model: models.Authorities,
            as: "Authorities",
            required: false,
            attributes: ['uuid', 'role'],
            through: { attributes: [] }
        }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response);
        }
        else {
            callback("There is no data")
        }
    }).catch(function (err) {
        callback(err);
    })
}

module.exports.updateuser = function (UserDetails, callback) {
    var value = UserDetails
    console.log('-----------value------------', value);
    var selector = { where: { uuid: UserDetails.uuid } }
    console.log('-----------selector-----------', selector);
    models.Users.update(value, selector).then(function (response) {
        async.forEach(UserDetails.Authorities, function (data, callback) {
            var value = {
                AuthorityUuid: data.uuid
            }
            var selector = { where: { UserUuid: UserDetails.uuid } }
            models.UserAuthorities.update(value, selector).then(function (response) {
                callback(response)
            })
        }, function (err) {
            callback(err)
        })
    })
}

module.exports.deleteuser = function (UserID, callback) {
    models.Users.destroy({ where: { uuid: UserID } }).then(function (response) {
        if (response != 0) {
            callback(response)
        }
        else {
            callback("There is no row affected")
        }
    }).catch(function (err) {
        callback(err);
    })
}

module.exports.disableuser = function (UserID, callback) {

    var selector = { where: { uuid: UserID } }

    models.Users.findOne(selector).then(function (response) {
        var value = response.dataValues;
        value.isDisabled = true;
        
        models.Users.update(value, selector).then(function (response) {
            callback(response)
        }).catch(function (err) {
            callback(err);
        })
    })

}

module.exports.getuserByOrganizationId = function (OrganizationId, callback) {
    models.Users.findAll({
        where: { organizationUuid: OrganizationId, isDisabled: false},
        order:[
            ['firstname','DESC']
        ],
        include: [{
            model: models.Organizations,
            as: "organization"
        },
        {
            model: models.Authorities,
            as: "Authorities",
            required: false,
            attributes: ['uuid', 'role'],
            through: { attributes: [] }
        }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response);
        }
        else {
            callback(null)
        }
    }).catch(function (err) {
        callback(err);
    })
}

module.exports.getUser = function (user, callback) {
    models.Users.findAll({
        where: { username: user },
        order:[
            ['firstname','DESC']
        ],
        include: [{
            model: models.Organizations,
            as: "organization"
        },
        {
            model: models.Authorities,
            as: "Authorities",
            required: false,
            attributes: ['uuid', 'role'],
            through: { attributes: [] }
        }]
    }).then(function (response) {
        if (response.length === 1) {
            callback(response);
        }
        else {
            callback(null)
        }
    }).catch(function (err) {
        callback(err);
    })
}
