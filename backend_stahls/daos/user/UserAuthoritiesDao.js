var models = require("../../models")
module.exports.getById = function (Authority_id, callback) {
    models.UserAuthorities.findAll({where:{AuthorityUuid:Authority_id}}).then(function(response) {
        callback(response)
    })
}