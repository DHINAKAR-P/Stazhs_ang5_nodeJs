var InventoryService = require("../../services/inventory/InventoryService");

module.exports.createinventory = function (req, res) {
    var InventoryDetails = req.body;
    console.log("i am in create all in",InventoryDetails)
    InventoryService.createinventory(InventoryDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getallinventories = function (req, res) {
    // console.log("i am in create all in",res);            
    InventoryService.getallinventories(function (response) {
        res.json(response);
        res.status(200);
    })
}


module.exports.getinventorybyActiveStatus = function (req, res) {
    InventoryService.getinventorybyActiveStatus(function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.getinventorybyid = function (req, res) {
    var inventoryID = req.params.uuid;
    InventoryService.getinventorybyid(inventoryID, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.updateinventory = function (req, res) {
    var InventoryDetails = req.body;
    InventoryService.updateinventory(InventoryDetails, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.deleteinventory = function (req, res) {
    var inventoryID = req.params.uuid;
    InventoryService.deleteinventory(inventoryID, function (response) {
        res.json(response);
        res.status(200);
    })
}
 

 
