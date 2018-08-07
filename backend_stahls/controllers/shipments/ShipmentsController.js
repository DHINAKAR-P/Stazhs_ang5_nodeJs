var ShipmentsService = require("../../services/shipments/ShipmentsService")
/**
 * Create Shipments 
 * @param {ShipmentsDetaisl} req 
 * @param {Create The Shipments Also With Reports,Groups } res 
 */
module.exports.createShipments = function (req, res) {
    var ShipmentsDetails = req.body;
    ShipmentsService.createShipments(ShipmentsDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List Of Shipments 
 * @param {GetAll} req 
 * @param {Getting The List Of Shipments Details From Shipments} res 
 */
module.exports.getallShipments = function (req, res) {
    ShipmentsService.getallShipments(function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List of Shipments Based On ShipmentsId
 * @param {ShipmentsiD} req 
 * @param {Getting Particular Shipments Details Based On ShipmentsId} res 
 */
module.exports.getShipmentsById = function (req, res) {
    var Shipment_id = req.params.shipmentId;
    ShipmentsService.getShipmentsById(Shipment_id, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List of PackedItems Based On PackedBoxId
 * @param {PackedBox_id} req 
 * @param {Getting Particular packedBox Details Based On PackedBoxId} res 
 */
module.exports.getPackedBoxById = function (req, res) {
    var PackedBox_id = req.params.packedBoxId;
    ShipmentsService.getPackedBoxById(PackedBox_id, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Delete The Particular Shipments Based on ShipmentsId
 * @param {ShipmentsId} req 
 * @param {Delete Paticular Shipments Details Form Shipments Based on ShipmentsId} res 
 */
module.exports.delete_Shipments = function (req, res) {
    var Shipment_id = req.params.shipmentId;
    ShipmentsService.delete_Shipments(Shipment_id, function () {
        res.status(204);
        res.end();
    });
}

/**
 * Update Particular Shipments
 * @param {ShipmentsId} req 
 * @param {Update Particular Shipments Details Based On It's ShipmentsId} res 
 */
module.exports.update_Shipments = function (req, res) {
    var ShipmentsDetails = req.body;
    ShipmentsService.update_Shipments(ShipmentsDetails, function (response) {
        res.json(response);
        res.status(201);
    });
}