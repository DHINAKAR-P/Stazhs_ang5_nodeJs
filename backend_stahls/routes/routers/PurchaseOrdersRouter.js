var express = require("express");
var router = express.Router();
var controller = require("../../controllers/purchase_orders/PurchaseOrderController");
router.post("/create", controller.createpurchaseorder);
router.get("/getall", controller.getallpurchaseorders);
router.get("/get/:ReceiveID", controller.getpurchaseorderbyid);
router.put("/update", controller.updatepurchaseorder);
router.delete("/delete/:ReceiveID", controller.deletepurchaseorder);
module.exports = router;