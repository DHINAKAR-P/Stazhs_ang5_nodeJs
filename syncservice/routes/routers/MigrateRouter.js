var express = require("express");
var router = express.Router();
const controller = require("../../controllers/controller");

router.put("/update", controller.updateTimeFrequency)
router.get("/get", controller.getTimeFrequency)

module.exports = router;