'use strict';

module.exports = function (sequelize, DataTypes) {
    var TrackingInfo = sequelize.define("TrackingInfo", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },//number
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        time: DataTypes.DOUBLE,
        location: DataTypes.STRING,
        activity: DataTypes.STRING,
        
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

        TrackingInfo.associate = (models) => {
            TrackingInfo.belongsTo(models.Shipments,{ foreignKey: 'ShipmentID'})
        };    
    
    return TrackingInfo;
}