var express = require("express");
var router = express.Router();

var controller = require("../../controllers/inventory/InventoryController");

router.post("/create", controller.createinventory);
router.get("/getall", controller.getallinventories);
router.get("/get/:uuid", controller.getinventorybyid);
router.put("/update", controller.updateinventory);
router.delete("/delete/:uuid", controller.deleteinventory);
router.get("/getallactiveinventory", controller.getinventorybyActiveStatus);

module.exports = router;