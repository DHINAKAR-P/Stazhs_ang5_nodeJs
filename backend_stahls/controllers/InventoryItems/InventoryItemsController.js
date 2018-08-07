
var Inventoryitemservice = require('../../services/InventoryItems/InventoryItemService');

module.exports.createinventoryitems = function(req,res){
    var InventoryItems = req.body;
    Inventoryitemservice.inventoryitem(InventoryItems,function(response){
        res.json(response);
        res.status(201);
    });

}
module.exports.getallinventoryitems = function (req,res){

    Inventoryitemservice.getallinventoryitems(function(response){
        res.json(response);
        res.status(200);
    });
}
module.exports.getinventoryitembyid = function (req,res){

    var inventoryitemid = req.params.uuid;
    Inventoryitemservice.getinventoryitembyid(inventoryitemid,function(response){
        res.json(response);
        res.status(200);
    })
}