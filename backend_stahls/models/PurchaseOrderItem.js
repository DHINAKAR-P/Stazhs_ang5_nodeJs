'use strict';

module.exports = function (sequelize, DataTypes) {
    var VendorReceiveDetails = sequelize.define("VendorReceiveDetails", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,          
        },
        ReceiveItemID:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        ItemQuantity:DataTypes.FLOAT,
        ReceiveID:DataTypes.INTEGER,
        Season:DataTypes.STRING,
        StyleColor:DataTypes.STRING,
        StyleNumber:DataTypes.STRING,
        StyleOption:DataTypes.STRING,
        Subtotal:DataTypes.STRING,
        UPCNumber:DataTypes.STRING,
        QuantityOrdered:DataTypes.INTEGER
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    VendorReceiveDetails.associate = (models) => {
            VendorReceiveDetails.belongsTo(models.VendorReceive,{ foreignKey: 'ReceiveID'})
    };
    return VendorReceiveDetails;
}