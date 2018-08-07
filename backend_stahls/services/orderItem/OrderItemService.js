var OrderItemDao = require("../../daos/orderItem/OrderItemDao")

module.exports.createOrderItem = function (OrderItemDetails, callback) {
    OrderItemDao.createOrderItem(OrderItemDetails, function(response){
        callback(response);
    })
}

module.exports.getallOrderItem = function (callback) {
    OrderItemDao.getallOrderItem(function(response){
        callback(response)
    })
}

module.exports.getOrderItemById = function (OrderItem_id, callback) {
    OrderItemDao.getOrderItemById(OrderItem_id,function(response){
        callback(response)
    })
}

module.exports.delete_OrderItem = function (OrderItem_id, callback) {
    OrderItemDao.delete_OrderItem(OrderItem_id, function () {
       callback();
    });
}

module.exports.update_OrderItem = function (OrderItemDetails, callback) {
    OrderItemDao.update_OrderItem(OrderItemDetails, function (response) {
        callback(response)
    });
}