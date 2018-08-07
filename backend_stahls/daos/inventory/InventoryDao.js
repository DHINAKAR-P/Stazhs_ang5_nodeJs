var models = require("../../models")


module.exports.createinventory = function (InventoryDetails, callback) {
    models.FinishedGoods.create(InventoryDetails).then(function (response) {
        console.log("i am in dao  in",InventoryDetails)
        callback(response)
    }).catch(function (error) {
        callback(error) 
    })
}

module.exports.getallinventories = function (callback) {
    console.log("i am in dao  in",models.Inventory);                    
    models.FinishedGoods.findAll({
        order:[
            ['StyleNumber','DESC']
        ],
        include:[{
            model: models.FinishedGoodsAdjustment
        }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Inventory")
        }
    }).catch(function (error) {
        callback(error)
    })
}


module.exports.getinventorybyActiveStatus = function (callback)  {
    models.FinishedGoods.findAll({
        where:{StatusName:'Active'},
        order:[
            ['StyleNumber','DESC']
        ],
        include:[{
            model:models.FinishedGoodsAdjustment
        }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Inventory")
        }
    }).catch(function (error) {
        callback(error)
    })
}
module.exports.getinventorybyid = function (inventoryID, callback) {
    models.FinishedGoods.findOne({

        where:{FinishedGoodsID:inventoryID},
        order:[
            ['StyleNumber','DESC']
        ],
        include:[{
            model:models.FinishedGoodsAdjustment
        }]
       
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Inventory")
        }
    }).catch(function (error) {
        callback(error)
    })
}

 
module.exports.deleteinventory = function (inventoryID, callback) {
    models.FinishedGoods.destroy({ where: { uuid: inventoryID } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.updateinventory = function (InventoryDetails, callback) {
    models.FinishedGoods.update(InventoryDetails, { where: { uuid: InventoryDetails.uuid } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}