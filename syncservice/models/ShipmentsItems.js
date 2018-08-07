'use strict';

module.exports = function (sequelize, DataTypes) {
    var ShipmentsItems = sequelize.define("ShipmentsItems", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        GoodsTransactionID:{
            type:DataTypes.INTEGER,
            primaryKey: true            
        },

        DataExportID:DataTypes.INTEGER,
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        CustomerCode:DataTypes.STRING,
        DataExportDate:DataTypes.DATE,
        DecorationOwnerID:DataTypes.INTEGER,
        DecorationOwnerItemNumber:DataTypes.INTEGER,
        GarmentSize:DataTypes.STRING,
        IsSecond:DataTypes.STRING,
        IsSecondID:DataTypes.INTEGER,
        OrderID:DataTypes.INTEGER,
        OrderNumber:DataTypes.STRING,
        PODetailNumber:DataTypes.STRING,
        Quantity:DataTypes.FLOAT,
        ShipCount:DataTypes.FLOAT,
        ShipmentID:DataTypes.INTEGER,
        ShipNumber:DataTypes.STRING,
        StyleColor:DataTypes.STRING,
        StyleNumber:DataTypes.STRING,
        StyleOption:DataTypes.STRING,
        TransactionReasonCode:DataTypes.STRING,
        TransactionReasonCode2:DataTypes.STRING,
        UnitPrice:DataTypes.STRING,
        UPCNumber:DataTypes.STRING,
        
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    ShipmentsItems.associate = (models) => {
        ShipmentsItems.belongsTo(models.Shipments,{ foreignKey: 'ShipmentID'})
    };
    return ShipmentsItems;
}