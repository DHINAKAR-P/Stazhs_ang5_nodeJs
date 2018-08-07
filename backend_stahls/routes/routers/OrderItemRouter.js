var express = require("express");
var router = express.Router();
var controller = require("../../controllers/orderItem/OrderItemController");


router.post("/create", controller.creeateOrderItem);
router.get("/getall",controller.getallOrderItem);
router.get("/get/:uuid",controller.getOrderItemById);
router.delete("/delete/:uuid",controller.delete_OrderItem);
router.put("/update",controller.update_OrderItem);

module.exports = router;