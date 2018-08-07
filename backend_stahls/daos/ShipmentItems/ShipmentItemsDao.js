var models = require("../../models")


module.exports.getallShipmentItems = function (callback) {
    models.ShipmentsItems.findAll({
        include: [
            {
                model: models.Shipments
            }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no ShipmentItems")
        }

    }).catch(function (error) {
        callback(error)
    })
}


module.exports.getShipmentItemById = function (ShipmentItem_id, callback) {
    models.ShipmentsItems.findOne({
        where: { uuid: ShipmentItem_id },
        include: [
            {
                model: models.Shipments
            }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no ShipmentItem")
        }

    }).catch(function (error) {
        callback(error)
    })
}