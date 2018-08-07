var express = require("express");
var router = express.Router();
var ChatController = require("../../controllers/chat/ChatController");

router.post("/create", ChatController.create_Chat);
router.get("/getbyticketid/:ticketid",ChatController.getChatByTicketId);

module.exports = router;