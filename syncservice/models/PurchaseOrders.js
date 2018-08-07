'use strict';
var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    var VendorReceive = sequelize.define("VendorReceive", {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: shortid.generate,
        },
        ReceiveID:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        ManufactureID:DataTypes.INTEGER,
        ManufactureNumber:DataTypes.STRING,
        
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

    VendorReceive.associate = (models) => {
            VendorReceive.belongsTo(models.VendorPOs,{ foreignKey: 'ManufactureID'})
            VendorReceive.hasMany(models.VendorReceiveDetails,{ foreignKey: 'ReceiveID'})
    };

    return VendorReceive;
}
