var ShipmentItemsService = require("../../services/ShipmentItem/ShipmentItemService")


module.exports.getallShipmentItems = function (req, res) {
    ShipmentItemsService.getallShipmentItems(function (response) {
        res.json(response);
        res.status(201);
    })
}


module.exports.getShipmentItemById = function (req, res) {
    var ShipmentItem_id = req.params.uuid;
    ShipmentItemsService.getShipmentItemById(ShipmentItem_id, function (response) {
        res.json(response);
        res.status(201);
    })
}
