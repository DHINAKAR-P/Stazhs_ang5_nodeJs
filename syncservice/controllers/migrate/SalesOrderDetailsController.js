var models = require("../../models")
var Sequelize = require('sequelize');
var asyncLoop = require('node-async-loop')
var config = require('../../config/config.json');

var Shipments =require('./ShipmentsController');

var DataExportDate = null;

const sequelize = new Sequelize(config.dumpDb.name, config.dumpDb.username, config.dumpDb.password, {
    dialect: config.dumpDb.dialect,
    host: config.dumpDb.host,
    port: config.dumpDb.port,
    dialectOptions: {
        "encrypt": true
    }
})



module.exports.migrateSalesOrderDetails = function () {

    sequelize.query("SELECT TOP 1 * FROM P_SalesOrderDetails ORDER BY DataExportDate DESC",
        { type: sequelize.QueryTypes.SELECT })
        .then(data1 => {
           
        if(data1.length!==0){    
            DataExportDate = data1[0].DataExportDate;

            models.SalesOrderDetails.findAll({ limit: 1, order: [ [ 'DataExportDate', 'DESC' ]]}).then(function(response){
             if(response.length!==0){    
                if (DataExportDate > response[0].DataExportDate) {

                    sequelize.query("SELECT * FROM P_SalesOrderDetails where DataExportDate > "+"'"+response[0].DataExportDate.toISOString()+"'", { type: sequelize.QueryTypes.SELECT })
                        .then(data2 => {

                            if (data2.length != 0) {
                                models.SalesOrderDetails.findAll().then(function (response) {
                                    if (response.length != 0) {
                                        console.log("--------> Start SalesOrderDetails Sync..")
                                        startMigrate(data2);
                                    } else {
                                        console.log("--------> Start SalesOrderDetails Migrate")
                                        startMigrate(data2);
                                    }
                                });
                            } else {
                                console.log("--------> No Records To Migrate!")
                                nextTable();
                            }

                        })


                } else {
                    console.log("--------> SalesOrderDetails Uptodate")
                    nextTable();
                }

            }else{
                sequelize.query("SELECT * FROM P_SalesOrderDetails", { type: sequelize.QueryTypes.SELECT })
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

        models.SalesOrderDetails.upsert(data[i]).then(async function (response) {

        }).catch(function (error) {
            console.log("error----->", error)

        })

        if (count === data.length) {
            console.log("--------> Success SalesOrderDetails Migrated!")
            console.log("--------> Sleeping for 2secs..")
            await sleep(2000)
            nextTable();
        }
        await sleep(100)
    }


}

function nextTable() {

    models.SyncService.update( { SyncOperation: true, SyncStatus: 'InProgress' },
        { where: { SyncTable: 'Shipments' } }
    ).then(function (response) {

        models.SyncService.update({ SyncOperation: false, SyncStatus: 'complete',  DataExportDate: DataExportDate },
         { where: { SyncTable: 'SalesOrderDetails' } }
        ).then(function (response) {
            Shipments.migrateShipments();
        })
    })

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}








