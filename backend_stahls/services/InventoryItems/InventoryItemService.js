var InventoryItemDao = require('../../daos/InventoryItems/InventoryItemDao');

module.exports.inventoryitem = function (InventoryItems, callback) {
    InventoryItemDao.itemdao(InventoryItems, function (response) {
        callback(response);
    });
}
module.exports.getallinventoryitems = function (callback){
    InventoryItemDao.getallinventoryitems(function(response){
        callback(response);        
    })
}
module.exports.getinventoryitembyid = function (inventoryitemid,callback){
    InventoryItemDao.getinventoryitembyid(inventoryitemid,function(response){
        callback(response);
    })
}