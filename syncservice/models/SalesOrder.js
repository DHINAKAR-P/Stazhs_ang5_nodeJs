'use strict';

module.exports = function (sequelize, DataTypes) {
    var SalesOrder = sequelize.define("SalesOrder", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        OrderID: {
           type: DataTypes.INTEGER,
           primaryKey: true
        }, 
        DataExportID: DataTypes.INTEGER,
        DataExportDate: DataTypes.DATE,
        CompanyID: DataTypes.INTEGER,
        CompanyCode: DataTypes.STRING,
        OrderNumber: DataTypes.STRING,
        StatusName: DataTypes.STRING,
        ShipDate: DataTypes.DATE,
        InvoiceDate: DataTypes.DATE,
        ShipCount: DataTypes.FLOAT,
        StatusID: DataTypes.INTEGER,
        CustomerID: DataTypes.INTEGER,
        PONumber: DataTypes.STRING,
        OrderDate: DataTypes.DATE,
        RequiredDate: DataTypes.DATE,
        RequestCount: DataTypes.FLOAT,
        ActualCount: DataTypes.FLOAT,
        AllocateCount: DataTypes.FLOAT,
        CustomerCode: DataTypes.STRING,
        ForecastFinish: DataTypes.DATE,
        Tickets: DataTypes.INTEGER, 
        ShipperNumber:DataTypes.STRING,
        CustomerPODate:DataTypes.DATE,
        Comments9:DataTypes.STRING,
        AllocateDate:DataTypes.DATE,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    SalesOrder.associate = (models) => {
        SalesOrder.hasMany(models.SalesOrderItems,{ foreignKey: 'OrderID'})
        SalesOrder.belongsToMany(models.Tickets,{through:'SalesOrderTickets',as:'Ticket'})
        SalesOrder.hasMany(models.Shipments,{ foreignKey: 'OrderID'})
        SalesOrder.hasOne(models.SalesOrderStatus,{ foreignKey: 'OrderID'})
    };
    return SalesOrder;
}