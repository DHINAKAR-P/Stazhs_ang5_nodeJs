'use strict';

module.exports = function (sequelize, DataTypes) {
    var InvoiceDetails = sequelize.define("InvoiceDetails", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        GoodsTransactionID:{
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        DetailManufactureNumber:DataTypes.STRING,
        Discount:DataTypes.STRING,
        GarmentSize:DataTypes.STRING,
        PODetailNumber:DataTypes.STRING,
        SalesTax:DataTypes.STRING,
        ShipCount:DataTypes.FLOAT,
        ShipmentID:DataTypes.INTEGER,
        StyleColor:DataTypes.STRING,
        StyleNumber:DataTypes.STRING,
        StyleOption9:DataTypes.STRING,
        StyleOption11:DataTypes.STRING,
        UnitPrice:DataTypes.STRING,
        UPCNumber:DataTypes.STRING,
        
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

    InvoiceDetails.associate = (models) => {
        InvoiceDetails.belongsTo(models.Invoices,{ foreignKey: 'ShipmentID'})
    };  
    return InvoiceDetails;
}