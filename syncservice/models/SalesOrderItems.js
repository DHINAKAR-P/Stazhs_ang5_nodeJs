'use strict';

module.exports = function (sequelize, DataTypes) {
    var SalesOrderItems = sequelize.define("SalesOrderItems", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        OrderItemID:{
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        DataExportID: DataTypes.INTEGER,
        DataExportDate: DataTypes.DATE,
        CompanyID: DataTypes.INTEGER,
        CompanyCode: DataTypes.STRING,
        OrderNumber: DataTypes.STRING,
        OrderID: DataTypes.INTEGER,
        ItemNumber: DataTypes.INTEGER,
        UnitPrice: DataTypes.STRING,
        StyleID: DataTypes.INTEGER,
        OrderSubtotal: DataTypes.STRING,
        StyleNumber: DataTypes.STRING,
        StyleName: DataTypes.STRING,
        StyleCustomerNumber: DataTypes.STRING,
        StyleColor: DataTypes.STRING,
        QuantityRequested: DataTypes.FLOAT,
        QuantityActual: DataTypes.FLOAT,
        QuantityShipped: DataTypes.FLOAT,
        StyleOption9: DataTypes.STRING,
        StyleOption11: DataTypes.STRING,
        OrderRequiredDate: DataTypes.DATE,
        ItemManufactureNumber: DataTypes.STRING,
        DecorationOwnerID: DataTypes.INTEGER,
        ForecastFinish: DataTypes.DATE,
        CustomerCode: DataTypes.STRING,
        DecorationOwnerItemNumber: DataTypes.INTEGER,
        StyleOption: DataTypes.STRING,

    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

    SalesOrderItems.associate = (models) => {
        SalesOrderItems.hasMany(models.SalesOrderDetails,{ foreignKey: 'OrderItemID'})
    };

    return SalesOrderItems;
}