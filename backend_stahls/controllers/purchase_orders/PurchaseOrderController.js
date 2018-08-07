var PurchaseOrderService = require("../../services/purchaseorder/PurchaseOrderService");

module.exports.createpurchaseorder = function (req, res) {
    var PurchaseOrderDetails = req.body;
    console.log("i am in create all in",PurchaseOrderDetails)
    PurchaseOrderService.createpurchaseorder(PurchaseOrderDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getallpurchaseorders = function (req, res) {
    PurchaseOrderService.getallpurchaseorders(function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.getpurchaseorderbyid = function (req, res) {
    var purchaseorderID = req.params.ReceiveID;
    PurchaseOrderService.getpurchaseorderbyid(purchaseorderID, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.updatepurchaseorder = function (req, res) {
    var PurchaseOrderDetails = req.body;
    PurchaseOrderService.updatepurchaseorder(PurchaseOrderDetails, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.deletepurchaseorder = function (req, res) {
    var purchaseorderID = req.params.ReceiveID;
    PurchaseOrderService.deletepurchaseorder(purchaseorderID, function (response) {
        res.json(response);
        res.status(200);
    })
}
 

 
