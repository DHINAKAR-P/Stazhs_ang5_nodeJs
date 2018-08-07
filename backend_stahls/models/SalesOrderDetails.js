'use strict';

module.exports = function (sequelize, DataTypes) {
    var SalesOrderDetails = sequelize.define("SalesOrderDetails", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        OrderDetailsID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },      
        DataExportID: DataTypes.INTEGER,
        DataExportDate: DataTypes.DATE,
        CompanyID: DataTypes.INTEGER,
        CompanyCode: DataTypes.STRING,
        ListPrice: DataTypes.STRING,
        StatusName: DataTypes.STRING,
        StatusID: DataTypes.INTEGER,
        FinishedGoodsID: DataTypes.INTEGER,
        GarmentSize: DataTypes.STRING,
        Description: DataTypes.STRING(1024),
        OrderID: DataTypes.INTEGER,
        OrderItemID: DataTypes.INTEGER,
        ItemRequiredDate: DataTypes.DATE,
        UPCNumber2: DataTypes.STRING,
        SKUNumber2: DataTypes.STRING,
        RequestCount: DataTypes.FLOAT,
        ActualCount: DataTypes.FLOAT,
        StyleNumber2: DataTypes.STRING,
        StyleName2: DataTypes.STRING,
        Season2: DataTypes.STRING,
        StyleColor2: DataTypes.STRING,
        StyleColorDescription2: DataTypes.STRING,
        ArtworkStatusID: DataTypes.INTEGER,
        ArtworkStatus: DataTypes.STRING,
        StyleOption: DataTypes.STRING,
        CustomerCode: DataTypes.STRING,
        DecorationOwnerID: DataTypes.INTEGER,
        DecorationOwnerItemNumber: DataTypes.INTEGER,
        ForecastFinish: DataTypes.DATE,
        createdDate: DataTypes.DATE,
        updatedDate: DataTypes.DATE


    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

    SalesOrderDetails.associate = (models) => {
        // SalesOrderDetails.belongsTo(models.SalesOrder)
        SalesOrderDetails.belongsTo(models.SalesOrder,{ foreignKey: 'OrderID'})
        SalesOrderDetails.belongsTo(models.SalesOrderItems,{ foreignKey: 'OrderItemID'})
    };

    return SalesOrderDetails;
}