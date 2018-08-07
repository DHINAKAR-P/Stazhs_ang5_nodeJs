var models = require("../../models")
var Sequelize = require('sequelize');
var asyncLoop = require('node-async-loop')
var config = require('../../config/config.json');
var SalesOrderItems = require("./SalesOrderItemsController");


const sequelize = new Sequelize(config.dumpDb.name, config.dumpDb.username, config.dumpDb.password, {
    dialect: config.dumpDb.dialect,
    host: config.dumpDb.host,
    port: config.dumpDb.port,
    dialectOptions: {
        "encrypt": true
    }
})


module.exports.migrateSalesOrder = function () {

    sequelize.query("SELECT * FROM P_VendorReceiveDetails", { type: sequelize.QueryTypes.SELECT })
        .then(data => {

            console.log("data--count-------------->",data.length)
            models.VendorReceiveDetails.findAll().then(function (response) {
                if (response.length != 0) {
                    // if (response.length == data.length) {
                    //     console.log("---------SalesOrder records uptodate--------------")
                    //     SalesOrderItems.migrateSalesOrderItems();
                    // }

                    // if (response.length > data.length) {
                    //     console.log("--------SalesOrder New Record is Greater----------")
                    // }
                    // else {
                    //     var RecordAdded = response.length;
                    //     var RecordDump = data.length;

                    //     var ToAdd = (RecordDump - RecordAdded)

                    //     if (ToAdd > 0) {
                    //         console.log("no.of SalesOrder data to add------------>", ToAdd);
                    //         var DataToAdd = data.slice(Math.max(data.length - ToAdd, 1))
                    //         startMigrate(DataToAdd);
                    //     }

                    // }
                   // console.log("--------nothing to migrate----------")

                } else {
                    console.log("--------SalesOrder Fresh Migrate----------")
                    startMigrate(data);
                }
            });

        })

}


async function startMigrate(data) {
    var count = 0;
    for (i = 0; i < data.length; i++) {
        count++;
       
        models.VendorReceiveDetails.upsert(data[i]).then(async function (response) {

             }).catch(function (error) {
               console.log("error----->", error)

          })
          
          if (count === data.length) {               
            //callback(ontime)
            console.log("----------Success migration done--------")
           
         }
         await sleep(100)
    }   
    
 
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

