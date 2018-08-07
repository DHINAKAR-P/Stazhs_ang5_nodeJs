var express = require("express");
var router = express.Router();
var controller = require("../../controllers/group/GroupUsersController")


router.post("/create", controller.createGroupUser);
router.get("/getall",controller.getallgroupuser);
router.put("/update",controller.update_GroupUser);
router.get("/get/:uuid",controller.getGroupUserById)
router.delete("/delete/:userid/:groupid",controller.delete_GroupUser)


module.exports = router;