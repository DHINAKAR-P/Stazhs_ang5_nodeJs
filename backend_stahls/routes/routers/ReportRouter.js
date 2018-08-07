var express = require("express");
var router = express.Router();
var controller = require("../../controllers/report/ReportsController")


router.post("/create", controller.create_report);
router.get("/getall",controller.getallreport);
router.get("/get/:uuid",controller.getreportById);
router.get("/getReportByUser/:userid",controller.getreportByUser);
router.get("/getReportByOrganization/:organizationid",controller.getreportbyorganization);
router.put("/update",controller.update_report);
router.delete("/delete/:uuid",controller.delete_report);
router.post("/assign_user",controller.assing_user);
router.post("/remove_user",controller.remove_user);
router.post("/assing_group",controller.assing_group);
router.post("/remove_group",controller.remove_group);

module.exports = router;