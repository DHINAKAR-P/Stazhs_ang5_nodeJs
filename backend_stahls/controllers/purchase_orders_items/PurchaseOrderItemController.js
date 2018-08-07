var PurchaseOrderItemsService = require("../../services/purchase_orders_items/PurchaseOrderServiceItems");

module.exports.createpurchaseorderitem = function (req, res) {
    var PurchaseOrderItemsDetails = req.body;
    console.log("i am in create all in",PurchaseOrderItemsDetails)
    PurchaseOrderItemsService.createpurchaseorderitems(PurchaseOrderItemsDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getallpurchaseordersitems = function (req, res) {
    PurchaseOrderItemsService.getallpurchaseordersitems(function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.getpurchaseorderitemsbyid = function (req, res) {
    var purchaseorderItemsID = req.params.ReceiveItemID;
    PurchaseOrderItemsService.getpurchaseorderitemsbyid(purchaseorderItemsID, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.updatepurchaseorderitems = function (req, res) {
    var PurchaseOrderItemsDetails = req.body;
    PurchaseOrderItemsService.updatepurchaseorderitem(PurchaseOrderItemsDetails, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.deletepurchaseorderitems = function (req, res) {
    var purchaseorderItemsID = req.params.ReceiveItemID;
    PurchaseOrderItemsService.deletepurchaseorderitem(purchaseorderItemsID, function (response) {
        res.json(response);
        res.status(200);
    })
}
 

 
