var models = require("../../models")

module.exports.createOrderItem = function (OrderItemDetails, callback) {
    models.OrderItems.create(OrderItemDetails).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getallOrderItem = function (callback) {
    models.OrderItems.findAll().then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no OrderItems")
        }
    }).catch(function (error) {
        callback(error)
    })

}

module.exports.getOrderItemById = function (OrderItem_id, callback) {
    models.OrderItems.findById(OrderItem_id).then(response => {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no OrderItems")
        }
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.delete_OrderItem = function (OrderItem_id, callback) {
    models.OrderItems.destroy({ where: { uuid: OrderItem_id } }).then(response => {
        callback();
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.update_OrderItem = function (OrderItemDetails, callback) {
    models.OrderItems.update(OrderItemDetails, { where: { uuid: OrderItemDetails.uuid } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}