var express = require("express");
var router = express.Router();
var controller = require("../../controllers/invoices/InvoicesController");


router.post("/create", controller.createInvoices);
router.get("/getall",controller.getallInvoices);
router.get("/get/:uuid",controller.getInvoicesById);
router.delete("/delete/:uuid",controller.delete_Invoices);
router.put("/update",controller.update_Invoices);

module.exports = router;