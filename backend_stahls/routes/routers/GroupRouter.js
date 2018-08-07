var express = require("express");
var router = express.Router();
var controller = require("../../controllers/group/GroupController")


router.post("/create", controller.creategroup);
router.get("/getall",controller.getallgroup);
router.put("/update",controller.update_Group);
router.get("/get/:uuid",controller.getGroupById);
router.get("/getGroupByOrganization/:uuid",controller.getGroupByOrganizationId);
router.get("/getByOrganizationAndReport/:organizationid",controller.getGroupByOrganizationId);
router.delete("/delete/:uuid",controller.delete_Group);
router.get("/getgroupByreport/:uuid",controller.getgroupByreport);

module.exports = router;