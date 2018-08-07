var PurchaseOrdersDao = require("../../daos/purchaseorders/PurchaseOrdersDao")
  
var async = require("async")

module.exports.createpurchaseorder = function (PurchaseOrderDetails, callback) {
    console.log("i am in create  serviceall in",PurchaseOrderDetails)
    PurchaseOrdersDao.createpurchaseorder(PurchaseOrderDetails, function (response) {
        callback(response);
    })
}

module.exports.getallpurchaseorders = function (callback) {
    PurchaseOrdersDao.getallpurchaseorders(function (response) {
        callback(response);
    })
}

module.exports.getpurchaseorderbyid = function (purchaseorderID, callback) {
    PurchaseOrdersDao.getpurchaseorderbyid(purchaseorderID, function (response) {
        callback(response);
    })
}

module.exports.updatepurchaseorder = function (PurchaseOrderDetails, callback) {
    PurchaseOrdersDao.updatepurchaseorder(PurchaseOrderDetails, function (response) {
        callback(response);
    })
}

module.exports.deletepurchaseorder = function (purchaseorderID, callback) {
    PurchaseOrdersDao.deletepurchaseorder(purchaseorderID, function (response) {
        callback(response);
    })
}
