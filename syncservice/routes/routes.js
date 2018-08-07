var express = require("express");
var routers = require("./routers");

var api = express.Router();

api.use("/frequency", routers.MigrateRouter);


module.exports = api;
