var express = require("express");
var router = express.Router();
var controller = require("../../controllers/salesOrder/SalesOrderController");


router.post("/create", controller.createSalesOrder);
router.get("/getall",controller.getallSalesOrder); 
router.get("/get/:orderId",controller.getSalesOrderById);
router.delete("/delete/:orderId",controller.delete_SalesOrder);
router.put("/update",controller.update_SalesOrder);
router.put("/getNotificationDetails",controller.getAllSalesOrderDetails);

module.exports = router;