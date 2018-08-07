var InventoryDao = require("../../daos/inventory/InventoryDao")
  
var async = require("async")

module.exports.createinventory = function (InventoryDetails, callback) {
    console.log("i am in create  serviceall in",InventoryDetails)
    InventoryDao.createinventory(InventoryDetails, function (response) {
        callback(response);
    })
}

module.exports.getallinventories = function (callback) {
    InventoryDao.getallinventories(function (response) {
        callback(response);
    })
}


module.exports.getinventorybyActiveStatus = function (callback) {
    InventoryDao.getinventorybyActiveStatus(function (response) {
        callback(response);
    })
}

module.exports.getinventorybyid = function (inventoryID, callback) {
    InventoryDao.getinventorybyid(inventoryID, function (response) {
        callback(response);
    })
}

module.exports.updateinventory = function (InventoryDetails, callback) {
    InventoryDao.updateinventory(InventoryDetails, function (response) {
        callback(response);
    })
}

module.exports.deleteinventory = function (inventoryID, callback) {
    InventoryDao.deleteinventory(inventoryID, function (response) {
        callback(response);
    })
}
