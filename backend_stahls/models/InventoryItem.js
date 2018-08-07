'use strict';

module.exports = function (sequelize, DataTypes) {
    var FinishedGoodsAdjustment = sequelize.define("FinishedGoodsAdjustment",{
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        GoodsTransactionID:{
            type:DataTypes.INTEGER,
            primaryKey: true            
        },
        CompanyCode: DataTypes.STRING,
        CompanyID: DataTypes.INTEGER,
        CustomerCode: DataTypes.STRING,
        DataExportDate:{
            type: DataTypes.DATE,
            allowNull: false,
        },
        DataExportID: DataTypes.INTEGER,
        FinishedGoodsID: DataTypes.INTEGER,
        GarmentSize: DataTypes.STRING,
        Quantity: DataTypes.FLOAT,
        StyleColor : DataTypes.STRING,
        StyleCustomerNumber: DataTypes.STRING,
        StyleNumber : DataTypes.STRING,
        TransactionReasonCode: DataTypes.STRING,
        TransactionReasonCode2:DataTypes.STRING,
        UPCNumber:DataTypes.STRING,
    },{
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    FinishedGoodsAdjustment.associate = (models) => {
        FinishedGoodsAdjustment.belongsTo(models.FinishedGoods,{ foreignKey: 'FinishedGoodsID'})
    };
    return FinishedGoodsAdjustment;
}