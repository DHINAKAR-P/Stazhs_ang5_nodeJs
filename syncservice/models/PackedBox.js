'use strict';

module.exports = function (sequelize, DataTypes) {
    var PackedBox = sequelize.define("PackedBox", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        PackedBoxID:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        BoxCode:DataTypes.STRING,
        BoxNumber:DataTypes.STRING,
        CompanyCode:DataTypes.STRING,
        CompanyID:DataTypes.INTEGER,
        CustomerCode:DataTypes.STRING,
        CustomerNumber:DataTypes.STRING,
        DataExportDate:DataTypes.DATE,
        DataExportID:DataTypes.INTEGER,
        PackedUnits:DataTypes.FLOAT,
        ShipmentID:DataTypes.INTEGER,
        ShipNumber:DataTypes.STRING,
        ShipperNumber:DataTypes.STRING
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    PackedBox.associate = (models) => {
        PackedBox.hasMany(models.PackedItems,{ foreignKey: 'PackedBoxID'})
        PackedBox.belongsTo(models.Shipments,{ foreignKey: 'ShipmentID'})
    };
    return PackedBox;
}