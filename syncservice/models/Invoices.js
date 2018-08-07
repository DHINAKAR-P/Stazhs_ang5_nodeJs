'use strict';

module.exports = function (sequelize, DataTypes) {
    var Invoices = sequelize.define("Invoices", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        ShipmentID: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        InvoiceNumber:DataTypes.STRING,
        BillToNumber:DataTypes.STRING,
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        Discount:DataTypes.STRING,
        DueDate:DataTypes.DATE,
        Freight:DataTypes.STRING,
        InvoiceDate:DataTypes.DATE,
        OrderComments10:DataTypes.STRING,
        OrderComments11:DataTypes.STRING,
        OrderComments12:DataTypes.STRING,
        OrderComments13:DataTypes.STRING,
        OrderComments14:DataTypes.STRING,
        OrderComments15:DataTypes.STRING,
        OrderDiscount:DataTypes.STRING,
        OrderFreight:DataTypes.STRING,
        OrderSalesTax:DataTypes.STRING,
        PONumber:DataTypes.STRING,
        POProductGroup:DataTypes.STRING,
        RequiredDate:DataTypes.DATE,
        RetailerPONumber:DataTypes.STRING,
        SalesPerson:DataTypes.STRING,
        SalesTax:DataTypes.STRING,
        ShipCount:DataTypes.FLOAT,
        ShipDate:DataTypes.DATE,
        ShipperNumber:DataTypes.STRING,
        ShipToNumber:DataTypes.STRING,
        StatusID:DataTypes.INTEGER,
        Subtotal:DataTypes.STRING,
        Terms:DataTypes.STRING,
        TotalPrice:DataTypes.STRING,
        
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

    Invoices.associate = (models) => {
        Invoices.belongsTo(models.SalesOrder,{ foreignKey: 'OrderID'})
        Invoices.hasMany(models.InvoiceDetails,{ foreignKey: 'ShipmentID'})
    };  
    return Invoices;
}