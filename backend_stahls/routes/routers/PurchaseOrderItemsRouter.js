var express = require("express");
var router = express.Router();
var controller = require("../../controllers/purchase_orders_items/PurchaseOrderItemController");
router.post("/create", controller.createpurchaseorderitem);
router.get("/getall", controller.getallpurchaseordersitems);
router.get("/get/:ReceiveItemID", controller.getpurchaseorderitemsbyid);
router.put("/update", controller.updatepurchaseorderitems);
router.delete("/delete/:ReceiveItemID", controller.deletepurchaseorderitems);
module.exports = router;