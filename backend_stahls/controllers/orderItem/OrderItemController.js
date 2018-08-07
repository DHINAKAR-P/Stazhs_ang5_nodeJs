var OrderItemService = require("../../services/orderItem/OrderItemService")
/**
 * Create OrderItem 
 * @param {OrderItemDetaisl} req 
 * @param {Create The OrderItem Also With Reports,Groups } res 
 */
module.exports.creeateOrderItem = function (req, res) {
    var OrderItemDetails = req.body;
    OrderItemService.createOrderItem(OrderItemDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List Of OrderItem 
 * @param {GetAll} req 
 * @param {Getting The List Of OrderItem Details From OrderItem} res 
 */
module.exports.getallOrderItem = function (req, res) {
    OrderItemService.getallOrderItem(function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List of OrderItem Based On OrderItemId
 * @param {OrderItemiD} req 
 * @param {Getting Particular OrderItem Details Based On OrderItemId} res 
 */
module.exports.getOrderItemById = function (req, res) {
    var OrderItem_id = req.params.uuid;
    OrderItemService.getOrderItemById(OrderItem_id, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Delete The Particular OrderItem Based on OrderItemId
 * @param {OrderItemId} req 
 * @param {Delete Paticular OrderItem Details Form OrderItem Based on OrderItemId} res 
 */
module.exports.delete_OrderItem = function (req, res) {
    var OrderItem_id = req.params.uuid;
    OrderItemService.delete_OrderItem(OrderItem_id, function () {
        res.status(204);
        res.end();
    });
}

/**
 * Update Particular OrderItem
 * @param {OrderItemId} req 
 * @param {Update Particular OrderItem Details Based On It's OrderItemId} res 
 */
module.exports.update_OrderItem = function (req, res) {
    var OrderItemDetails = req.body;
    OrderItemService.update_OrderItem(OrderItemDetails, function (response) {
        res.json(response);
        res.status(201);
    });
}