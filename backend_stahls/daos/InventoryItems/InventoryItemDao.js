var models = require('../../models');

module.exports.itemdao = function(InventoryItems,callback){
    models.FinishedGoodsAdjustment.create(InventoryItems).then(function(response){
        callback(response);
    }).catch(function(error){
        callback(error);
    })       
    
};
module.exports.getallinventoryitems = function(callback){

    models.FinishedGoodsAdjustment.findAll().then(function(response){
        console.log('--check---------',response);
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no InventoryItems")
        }
    }).catch(function(error){
        callback(error);
    })
}

module.exports.getinventoryitembyid = function(inventoryitemid,callback){
    models.FinishedGoodsAdjustment.findById(inventoryitemid,{

    }).then(function(response){
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no InventoryItems")
        }
    }).catch(function(error){
        callback(error);
    })
}