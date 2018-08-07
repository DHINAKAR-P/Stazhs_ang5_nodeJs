var express = require("express");
var router = express.Router();
var controller = require("../../controllers/user/UserController")


router.post("/create", controller.createuser);
router.get("/getall", controller.getalluser);
router.get("/get/:uuid", controller.getalluserbyid);
router.put("/update", controller.updateuser);
router.put("/disableuser/:uuid", controller.disableuser);
router.delete("/delete/:uuid", controller.deleteuser);
router.get("/getuserByrole/:uuid", controller.getuserByrole);
router.get("/getuserByreport/:uuid", controller.getuserByreport);
router.get("/getuserByOrganization/:uuid", controller.getuserByOrganizationId);
router.get("/getUserByGroup/:uuid", controller.getUserByGroup);
router.get("/getallroletm", controller.getallRoleTM);
router.get("/Username/:username",controller.getuser);
module.exports = router;