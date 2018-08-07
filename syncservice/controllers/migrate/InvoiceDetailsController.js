var models = require("../../models")
var Sequelize = require('sequelize');
var asyncLoop = require('node-async-loop')
var config = require('../../config/config.json');

var Inventory = require("./InventoryController");

var DataExportDate = null;

const sequelize = new Sequelize(config.dumpDb.name, config.dumpDb.username, config.dumpDb.password, {
    dialect: config.dumpDb.dialect,
    host: config.dumpDb.host,
    port: config.dumpDb.port,
    dialectOptions: {
        "encrypt": true
    }
})




  module.exports.migrateInvoiceDetails = function () {
  
    sequelize.query("SELECT TOP 1 * FROM P_InvoiceDetails ORDER BY DataExportDate DESC",
        { type: sequelize.QueryTypes.SELECT })
        .then(data1 => {
          if(data1.length!==0){  
            DataExportDate = data1[0].DataExportDate;

            models.InvoiceDetails.findAll({ limit: 1, order: [ [ 'DataExportDate', 'DESC' ]]}).then(function(response){
                if(response.length!==0){
                
                if (DataExportDate > response[0].DataExportDate) {

                    sequelize.query("SELECT * FROM P_InvoiceDetails where DataExportDate > "+"'"+response[0].DataExportDate.toISOString()+"'", { type: sequelize.QueryTypes.SELECT })
                        .then(data2 => {

                            if (data2.length != 0) {
                                models.InvoiceDetails.findAll().then(function (response) {
                                    if (response.length != 0) {
                                        console.log("--------> Start InvoiceDetails Sync..")
                                        startMigrate(data2);
                                    } else {
                                        console.log("--------> Start InvoiceDetails Migrate")
                                        startMigrate(data2);
                                    }
                                });
                            } else {
                                console.log("--------> No Records To Migrate!")
                                nextTable();
                            }

                        })


                } else {
                    console.log("--------> InvoiceDetails Uptodate")
                    nextTable();
                }

            }else{
                sequelize.query("SELECT * FROM P_InvoiceDetails", { type: sequelize.QueryTypes.SELECT })
                        .then(data3 => {startMigrate(data3)})
             }

            })

         }else{  nextTable();}
        })


}


async function startMigrate(data) {
    var count = 0;
    for (i = 0; i < data.length; i++) {
        count++;

        models.InvoiceDetails.upsert(data[i]).then(async function (response) {

        }).catch(function (error) {
            console.log("error----->", error)

        })

        if (count === data.length) {
            console.log("--------> Success InvoiceDetails Migrated!")
            console.log("--------> Sleeping for 2secs..")
            await sleep(2000)
            nextTable();
        }
        await sleep(100)
    }


}

function nextTable() {

    models.SyncService.update( { SyncOperation: true, SyncStatus: 'InProgress' },
        { where: { SyncTable: 'Inventory' } }
    ).then(function (response) {

        models.SyncService.update({ SyncOperation: false, SyncStatus: 'complete',  DataExportDate: DataExportDate },
         { where: { SyncTable: 'InvoiceDetails' } }
        ).then(function (response) {
            Inventory.migrateInventory();
        })
    })

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}           