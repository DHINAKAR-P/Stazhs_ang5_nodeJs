var SalesOrderDao = require("../../daos/salesOrder/SalesOrderDao")

module.exports.createSalesOrder = function (SalesOrderDetails, callback) {
    SalesOrderDao.createSalesOrder(SalesOrderDetails, function(response){
        callback(response);
    })
}

module.exports.getallSalesOrder = function (callback) {
    SalesOrderDao.getallSalesOrder(function(response){
        callback(response)
    })
}

module.exports.getSalesOrderById = function (orderId, callback) {
    SalesOrderDao.getSalesOrderById(orderId,function(response){
        callback(response)
    })
}

module.exports.delete_SalesOrder = function (orderId, callback) {
    SalesOrderDao.delete_SalesOrder(orderId, function () {
       callback();
    });
}

module.exports.getAllSalesOrderDetails = function(loggedOutDate,callback){
    SalesOrderDao.getAllSalesOrderDetails(loggedOutDate,function(response){
        callback(response);
    })
}

module.exports.update_SalesOrder = function (SalesOrderDetails, callback) {
    SalesOrderDao.update_SalesOrder(SalesOrderDetails, function (response) {
        callback(response)
    });
}