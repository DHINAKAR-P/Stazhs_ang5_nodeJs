var SalesOrderService = require("../../services/salesOrder/SalesOrderService")
/**
 * Create SalesOrder 
 * @param {SalesOrderDetaisl} req 
 * @param {Create The SalesOrder Also With Reports,Groups } res 
 */
module.exports.createSalesOrder = function (req, res) {
    var SalesOrderDetails = req.body;
    SalesOrderService.createSalesOrder(SalesOrderDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List Of SalesOrder 
 * @param {GetAll} req 
 * @param {Getting The List Of SalesOrder Details From SalesOrder} res 
 */
module.exports.getallSalesOrder = function (req, res) {
    SalesOrderService.getallSalesOrder(function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List of SalesOrder Based On SalesOrderId
 * @param {SalesOrderiD} req 
 * @param {Getting Particular SalesOrder Details Based On SalesOrderId} res 
 */
module.exports.getSalesOrderById = function (req, res) {
    var orderId = req.params.orderId;
    SalesOrderService.getSalesOrderById(orderId, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Delete The Particular SalesOrder Based on SalesOrderId
 * @param {SalesOrderId} req 
 * @param {Delete Paticular SalesOrder Details Form SalesOrder Based on SalesOrderId} res 
 */
module.exports.delete_SalesOrder = function (req, res) {
    var orderId = req.params.orderId;
    SalesOrderService.delete_SalesOrder(orderId, function () {
        res.status(204);
        res.end();
    });
}

/**
 * Update Particular SalesOrder
 * @param {SalesOrderId} req 
 * @param {Update Particular SalesOrder Details Based On It's SalesOrderId} res 
 */
module.exports.update_SalesOrder = function (req, res) {
    var SalesOrderDetails = req.body;
    SalesOrderService.update_SalesOrder(SalesOrderDetails, function (response) {
        res.json(response);
        res.status(201);
    });
}


module.exports.getAllSalesOrderDetails = function(req,res) {
    var userDetails = req.body;
    SalesOrderService.getAllSalesOrderDetails(userDetails,function(response){
        res.json(response);
        res.status(201);
    })
}