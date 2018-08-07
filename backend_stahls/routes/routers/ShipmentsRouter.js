var express = require("express");
var router = express.Router();
var controller = require("../../controllers/shipments/ShipmentsController");


router.post("/create", controller.createShipments);
router.get("/getall",controller.getallShipments);
router.get("/get/:shipmentId",controller.getShipmentsById);
router.delete("/delete/:shipmentId",controller.delete_Shipments);
router.put("/update",controller.update_Shipments);

router.get("/get/packedBoxItem/:packedBoxId",controller.getPackedBoxById);
module.exports = router;