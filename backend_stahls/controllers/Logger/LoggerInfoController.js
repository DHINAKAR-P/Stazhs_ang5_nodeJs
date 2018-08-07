var loggerService = require("../../services/Logger/LoggerInfoService");

module.exports.createLogger = function (req, res) {
    var logger = req.body;
    loggerService.createlogger(logger, function (loggerDetails) {
        res.status(201);
        res.json(loggerDetails);
    })
}

module.exports.getLoggerLevel = function (req, res) {
    loggerService.getLoggerLevel(function (logLevel) {
        res.status(200);
        res.json(logLevel);
    })


}