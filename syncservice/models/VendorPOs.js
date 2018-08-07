'use strict';
var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    var VendorPOs = sequelize.define("VendorPOs", {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: shortid.generate,
        },
        ManufactureID:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        ContractorAddress:DataTypes.STRING,
        ContractorNumber:DataTypes.STRING,
        FinishDate:DataTypes.DATE,
        ManufactureNumber:DataTypes.STRING,
        OrderDate:DataTypes.DATE,
        PONumber:DataTypes.STRING,
        SaveDate:DataTypes.DATE,
        StatusID:DataTypes.INTEGER,
        StatusName:DataTypes.STRING,

       
        
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

        VendorPOs.associate = (models) => {
          //  VendorPOs.belongsTo(models.VendorReceive,{ foreignKey: 'ManufactureID'})
    };

    return VendorPOs;
}
