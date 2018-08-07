var express = require("express");
var router = express.Router();
var controller = require("../../controllers/authority/AuthoritiesController")

 
router.post("/create", controller.create_authority);
router.get("/getall",controller.getallauthority);
router.get("/getallbyOrganization/:uuid",controller.getallauthoritybyOrg);
router.get("/get/:uuid",controller.getauthorityById);
router.put("/update",controller.update_authority);
router.delete("/delete/:uuid",controller.delete_authority);
router.put("/disableuserrole/:uuid",controller.disable_authority);
router.get("/role/:role",controller.get_RoleNoOrg);
router.get("/roleWorg/:role/:orgid",controller.get_Role);

module.exports = router;