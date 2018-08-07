var migrate = require("./migrate");
var models = require("../models")



module.exports.migrateAll = function () {


models.SyncService.findAll({ where: { SyncOperation: true }}).then(function (response) {   
    if(response.length===0){
        console.log("--------> Start Sync")
        migrate.SalesOrder.migrateSalesOrder();
        //migrate.TestMigration.migrateSalesOrder();
    }else{
        console.log("--------> Sync Already in Progress...")
    }

  })

}


/**
 *
 * Updating Time Frequency for Migrate
 *
 */
module.exports.updateTimeFrequency = function (req, res) {
    var syncData = req.body;

    models.StahlsConfig.update(syncData, { where: { name: 'migrationfrequency' } }).then(function (response) {
        res.json(response);
        res.status(200);
    }).catch(function (error) {
        res.json(error);
        res.status(500);
    })
}

/**
 *
 * Get Time Frequency for Migrate
 *
 */

module.exports.getTimeFrequency = function (req, res) {
    
    models.StahlsConfig.findOne({ where: { name: 'migrationfrequency' }}).then(function (response) {
        res.json(response);
        res.status(200);
    }).catch(function (error) {
        res.json(error);
        res.status(500);
    })
}