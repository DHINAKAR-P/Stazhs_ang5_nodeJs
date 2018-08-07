'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var confi = require('../config/config.json');
var db = {};
var env = process.env.NODE_ENV || 'development';
var config  = confi[env];
// var Cryptr = require('cryptr'),
  // cryptr = new Cryptr('myTotalySecretKey');
// var decrypted_Password = cryptr.decrypt(config.password);
var sequelize = new Sequelize(config.name, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate().then(function () {
}).catch(function (err) {
}).done();

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
module.exports == config;

