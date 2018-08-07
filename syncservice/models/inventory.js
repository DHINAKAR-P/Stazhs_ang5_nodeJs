'use strict';

module.exports = function (sequelize, DataTypes) {
    var FinishedGoods = sequelize.define("FinishedGoods", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        FinishedGoodsID: { 
            type:DataTypes.INTEGER,
            primaryKey: true,
        },
        AdjustedQuantityOnHand : DataTypes.FLOAT,
        CompanyCode : DataTypes.STRING,
        CompanyID : DataTypes.INTEGER,
        CustomerCode : DataTypes.STRING,
        DataExportDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        DataExportID: DataTypes.INTEGER,
        Description: DataTypes.STRING,
        GarmentSize: DataTypes.STRING,
        ListPrice: DataTypes.STRING,
        QuantityOnHand: DataTypes.FLOAT,
        QuantityAllocated:DataTypes.FLOAT,
        QuantitySeconds  : DataTypes.FLOAT,
        QuantityThirds: DataTypes.FLOAT,
        Season: DataTypes.STRING,
        SKUNumber: DataTypes.STRING,
        StatusID: DataTypes.INTEGER,
        StatusName: DataTypes.STRING,
        StyleColor: DataTypes.STRING,
        StyleID: DataTypes.INTEGER,
        StyleName: DataTypes.STRING,
        StyleNumber: DataTypes.STRING,
        StyleOption: DataTypes.STRING,
        UPCNumber: DataTypes.STRING,


    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
        FinishedGoods.associate = (models) => {
            FinishedGoods.hasMany(models.FinishedGoodsAdjustment,{ foreignKey: 'FinishedGoodsID'})
        };
    return FinishedGoods;
}

