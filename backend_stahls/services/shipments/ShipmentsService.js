var ShipmentsDao = require("../../daos/shipments/ShipmentsDao")

module.exports.createShipments = function (ShipmentsDetails, callback) {
    ShipmentsDao.createShipments(ShipmentsDetails, function(response){
        callback(response);
    })
}

module.exports.getallShipments = function (callback) {
    ShipmentsDao.getallShipments(function(response){
        callback(response)
    })
}

module.exports.getShipmentsById = function (Shipment_id, callback) {
    ShipmentsDao.getShipmentsById(Shipment_id,function(response){
        callback(response)
    })
}

module.exports.getPackedBoxById = function (PackedBox_id, callback) {
    ShipmentsDao.getPackedBoxById(PackedBox_id,function(response){
        callback(response)
    })
}

module.exports.delete_Shipments = function (Shipment_id, callback) {
    ShipmentsDao.delete_Shipments(Shipment_id, function () {
       callback();
    });
}

module.exports.update_Shipments = function (ShipmentsDetails, callback) {
    ShipmentsDao.update_Shipments(ShipmentsDetails, function (response) {
        callback(response)
    });
}