var models = require("../../models")
module.exports.getByRoleName = function (roleName, callback) {
    models.Authorities.find({ where: { role: roleName } }).then(function (response) {
        callback(response)
    })
}