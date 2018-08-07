var express = require("express");
var router = express.Router();
var controller = require("../../controllers/ShipmentItems/ShipmentItemsController");


router.get("/getall",controller.getallShipmentItems);
router.get("/get/:uuid",controller.getShipmentItemById);


module.exports = router;