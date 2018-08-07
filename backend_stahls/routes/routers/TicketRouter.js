var express = require("express");
var router = express.Router();
var controller = require("../../controllers/ticket/TicketController")


router.post("/create", controller.create_Ticket);
router.get("/getall",controller.getall_ticket);
router.get("/get/:uuid",controller.getticketById);
router.get("/getbyorg/:uuid",controller.getticketByOrgId);
router.get("/getbyuser/:uuid",controller.getticketByUserId);
router.put("/update",controller.update_ticket);
router.delete("/delete/:uuid",controller.delete_ticket);
router.get("/getbystatus/:status",controller.getticketByStatus);

module.exports = router; 