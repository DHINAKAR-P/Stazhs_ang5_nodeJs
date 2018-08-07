'use strict';

module.exports = function (sequelize, DataTypes) {
    var Shipments = sequelize.define("Shipments", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,           
        },
        
        ShipmentID:{
          type: DataTypes.INTEGER,
          primaryKey: true
        },

        BillToName:DataTypes.STRING,
        BillToNumber:DataTypes.STRING,
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        ContainerNumber:DataTypes.STRING,
        CustomerCode:DataTypes.STRING,
        CustomerID:DataTypes.INTEGER,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        Discount:DataTypes.STRING,
        DueDate:DataTypes.DATE,
        EdiTransportationMethod:DataTypes.STRING,
        Freight:DataTypes.STRING,
        InvoiceDate:DataTypes.DATE,
        InvoiceNumber:DataTypes.STRING,
        IsReturn:DataTypes.INTEGER,
        OrderComments10:DataTypes.STRING,
        OrderComments11:DataTypes.STRING,
        OrderComments12:DataTypes.STRING,
        OrderComments13:DataTypes.STRING,
        OrderComments14:DataTypes.STRING,
        OrderDiscount:DataTypes.STRING,
        OrderFreight:DataTypes.STRING,
        OrderID:DataTypes.INTEGER,
        OrderNumber:DataTypes.STRING,
        OrderSalesTax:DataTypes.STRING,
        OrderStatusID:DataTypes.INTEGER,
        OrderStatusName:DataTypes.STRING,
        PONumber:DataTypes.STRING,
        POProductGroup:DataTypes.STRING,
        RequiredDate:DataTypes.DATE,
        RetailerPONumber:DataTypes.STRING,
        SalesPerson:DataTypes.STRING,
        SalesTax:DataTypes.STRING,
        ShipCount:DataTypes.FLOAT,
        ShipDate:DataTypes.DATE,
        ShipNumber:DataTypes.STRING,
        ShipperNumber:DataTypes.STRING,
        ShipToName:DataTypes.STRING,
        ShipToNumber:DataTypes.STRING,
        Subtotal:DataTypes.STRING,
        Terms:DataTypes.STRING,
        TotalPrice:DataTypes.STRING,
        WayBill:DataTypes.STRING,
        StatusName:DataTypes.STRING,
        EdiCarrierSCAC:DataTypes.STRING,


    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    Shipments.associate = (models) => {
        Shipments.hasMany(models.TrackingInfo,{ foreignKey: 'ShipmentID'})
        // Shipments.belongsTo(models.SalesOrder,{ foreignKey: 'OrderID'})
        Shipments.hasMany(models.PackedBox,{ foreignKey: 'ShipmentID'})
        Shipments.hasMany(models.ShipmentsItems,{ foreignKey: 'ShipmentID'})
    };
    return Shipments;
}