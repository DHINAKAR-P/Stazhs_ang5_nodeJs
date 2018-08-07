var express = require("express");
var router = express.Router();
var controller = require("../../controllers/ticket/TicketAttachmentController");
var fileUpload = require("../../file_upload/fileUpload");

router.post("/save", controller.saveFileUrl);
router.get("/getall", controller.getalluploadfile);
router.get("/getbyid/:uuid", controller.getuploadfilebyid);
router.delete("/delete/:uuid", controller.deleteuploadfile);
router.post("/upload", fileUpload.uploadfile);


module.exports = router;