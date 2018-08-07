var models = require("../../models")


module.exports.createpurchaseorderitems = function (PurchaseOrderItemsDetails, callback) {
    models.VendorReceiveDetails.create(PurchaseOrderItemsDetails).then(function (response) {
        console.log("i am in dao  in",PurchaseOrderItemsDetails)
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getallpurchaseordersitems = function (callback) {
    models.VendorReceiveDetails.findAll({
       
    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getpurchaseorderitemsbyid = function (purchaseorderItemsID, callback) {
    models.VendorReceiveDetails.findById(purchaseorderItemsID, {
       
    }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

 
module.exports.deletepurchaseorderitem = function (purchaseorderItemsID, callback) {
    models.VendorReceiveDetails.destroy({ where: { ReceiveItemID: purchaseorderItemsID } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.updatepurchaseorderitem = function (PurchaseOrderItemsDetails, callback) {
    models.VendorReceiveDetails.update(PurchaseOrderItemsDetails, { where: { ReceiveItemID: PurchaseOrderItemsDetails.ReceiveItemID } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}