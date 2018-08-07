var ShipmentItemsDao = require("../../daos/ShipmentItems/ShipmentItemsDao")


module.exports.getallShipmentItems = function (callback) {
    ShipmentItemsDao.getallShipmentItems(function (response) {
        callback(response)
    })
}


module.exports.getShipmentItemById = function (ShipmentItem_id, callback) {
    ShipmentItemsDao.getShipmentItemById(ShipmentItem_id, function (response) {
       callback(response)
    })
}