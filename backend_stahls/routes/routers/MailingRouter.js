var express = require("express");
var router = express.Router();
var controller = require("../../controllers/mailing/MailController");

router.post("/send", controller.createMail);

module.exports = router;