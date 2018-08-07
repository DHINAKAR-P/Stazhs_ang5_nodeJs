'use strict';

module.exports = function (sequelize, DataTypes) {
    var PackedItems = sequelize.define("PackedItems", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        PackedItemID:{
            type:DataTypes.INTEGER,
            primaryKey: true
        },
        BoxCode:DataTypes.STRING,
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        CustomerCode:DataTypes.STRING,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        GarmentSize:DataTypes.STRING,
        ManufactureNumber:DataTypes.STRING,
        PackedBoxID:DataTypes.INTEGER,
        PODetailNumber:DataTypes.STRING,
        Quantity:DataTypes.FLOAT,
        StyleColor:DataTypes.STRING,
        StyleNumber:DataTypes.STRING,
        StyleOption:DataTypes.STRING,
        UPCNumber:DataTypes.STRING,


    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    PackedItems.associate = (models) => {
        PackedItems.belongsTo(models.PackedBox, { foreignKey: 'PackedBoxID'})
    };
    return PackedItems;
}