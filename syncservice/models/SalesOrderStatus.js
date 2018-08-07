'use strict';

module.exports = function (sequelize, DataTypes) {
    var SalesOrderStatus = sequelize.define("SalesOrderStatus", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        StatusID:{
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        DataExportID: DataTypes.INTEGER,
        DataExportDate: DataTypes.DATE,
        CompanyID: DataTypes.INTEGER,
        CompanyCode: DataTypes.STRING,
        OrderID: DataTypes.INTEGER,
        OrderNumber: DataTypes.STRING,
        StatusName: DataTypes.STRING,
        ShipCount: DataTypes.FLOAT,
        PONumber: DataTypes.STRING,
        RetailerPONumber: DataTypes.STRING,
        CustomerID: DataTypes.INTEGER,
        ActualCount: DataTypes.FLOAT,
        AllocateCount: DataTypes.FLOAT,
        InvoiceCount: DataTypes.FLOAT,
        CustomerCode: DataTypes.STRING,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

    SalesOrderStatus.associate = (models) => {
        SalesOrderStatus.belongsTo(models.SalesOrder,{ foreignKey: 'OrderID'})
    };

    return SalesOrderStatus;
}