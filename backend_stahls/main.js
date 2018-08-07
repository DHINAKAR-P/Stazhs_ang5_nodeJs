const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors')
// const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const winston = require('winston');
const expressWinston = require('express-winston');
const models = require("./models")
const router = require("./routes/routes");
const auth = require('./login/auth');
const swaggerDocument = require('./swagger.json');
const clientPath = path.resolve(__dirname, "client");
const uploadPath = path.resolve(__dirname, "uploads");

var app = express();
require('./login/passport');
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }))
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors({credentials: true, origin: true}))

const logDir = 'log';
// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');
// express-winston logger makes sense BEFORE the router assignments.

app.use(expressWinston.logger({
  transports: [
    new (winston.transports.File)({
      level: 'info',
      filename:  logDir + '/api-logs.log',
      prepend: true,
      logstash: true,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      colorize: false
    })
  ],
  statusLevels: false, // default value
  level: function (req, res) {
    var level = "";
    if (res.statusCode >= 100) { level = "info"; }
    if (res.statusCode >= 400) { level = "warn"; }
    if (res.statusCode >= 500) { level = "error"; }
    return level;
  },
  exitOnError: false
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use(fileUpload());
app.use("/", express.static(clientPath));
app.use("/uploads",express.static(uploadPath));
app.use("/api", passport.authenticate('jwt', { session: false }), router);
app.use('/auth', auth);
app.all('*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '/client/index.html'));
});
app.use(function(err, req, res, next) {
  res.status(err.status || 404);
  console.error("-------------------------plz do nothing when 404 occurs...!!!")
  next()
});
app.use(expressWinston.errorLogger({
  transports: [
    new (winston.transports.File)({
      level: 'info',
      filename: logDir + '/error/api-logs.log',
      prepend: true,
      logstash: true,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      colorize: false
    })
  ],
  statusLevels: false, // default value
  level: function (req, res) {
    var level = "";
    if (res.statusCode >= 100) { level = "info"; }
    if (res.statusCode >= 400) { level = "warn"; }
    if (res.statusCode >= 500) { level = "error"; }
    return level;
  },
  exitOnError: false
}));

//sequelize Connection Estsblishment
models.sequelize.sync().then(function () {
  var server = app.listen(8080, function () {
    server.address().port
    // winstonlogger.info('Express server listening on port ' + server.address().port);
  });
});
