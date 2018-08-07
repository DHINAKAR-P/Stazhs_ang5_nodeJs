const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require('body-parser');
var cors = require('cors')
// const fileUpload = require('express-fileupload');
const fs = require('fs');
const models = require("./models")
const controller = require("./controllers/controller");
const router = require("./routes/routes");
const clientPath = path.resolve(__dirname, "client");

const schedule = require('node-schedule');
 

var app = express();
app.use(bodyParser.json({ limit: '50mb' }))
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors({credentials: true, origin: true}))



app.use("/", express.static(clientPath));
app.use("/SyncService",router);
app.all('*', function (req, res) {
  res.status(200).sendFile(path.join(__dirname, '/client/index.html'));
});


models.StahlsConfig.findOne({ where: { name: 'migrationfrequency' }}).then(function (response) {
  var syncTime = response.value;
  var j = schedule.scheduleJob('*/'+syncTime+' * * * *', function(){
    console.log('---start---->');
       controller.migrateAll();
  });
})
//controller.migrateAll();


//sequelize Connection Estsblishment
models.sequelize.sync().then(function () {
  var server = app.listen(8080, function () {
    server.address().port
    // winstonlogger.info('Express server listening on port ' + server.address().port);
  });
});
