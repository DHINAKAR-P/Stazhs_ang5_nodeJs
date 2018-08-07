var models = require("../../models")

module.exports.createShipments = function (ShipmentsDetails, callback) {
    models.Shipments.create(ShipmentsDetails).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getallShipments = function (callback) {
    models.Shipments.findAll({
        order: [
            ['PONumber', 'DESC']
        ],
        include: [
            {
                model: models.TrackingInfo
            },
            {
                model: models.ShipmentsItems
            }
        ]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Shipments")
        }

    }).catch(function (error) {
        callback(error)
    })

}

module.exports.getShipmentsById = function (Shipment_id, callback) {
    console.log('entering into get shipment data @#@#$#####');
    models.Shipments.findOne({
        where: { ShipmentID: Shipment_id },
        order: [
            ['PONumber', 'DESC']
        ],
        include: [{
            model: models.ShipmentsItems,
        },
        {
            model: models.PackedBox,
        }
        ]

    }).then(response => {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Shipments")
        }
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getPackedBoxById = function (PackedBox_id, callback) {
    models.PackedBox.findOne({

        where: { PackedBoxID: PackedBox_id },
        include: [{
            model: models.PackedItems
        },
        ]

    }).then(response => {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no PackedBox")
        }
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.delete_Shipments = function (Shipment_id, callback) {
    models.Shipments.destroy({ where: { ShipmentID: Shipment_id } }).then(response => {
        callback();
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.update_Shipments = function (ShipmentsDetails, callback) {
    models.Shipments.update(ShipmentsDetails, { where: { ShipmentID: ShipmentsDetails.ShipmentID } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}