'use strict';

module.exports = function(sequelize,DataTypes) {
    var closeReason = sequelize.define('CloseReason',{
        uuid:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        code : {
            type:DataTypes.INTEGER,
            primaryKey: true,
        },
        Reason: DataTypes.STRING
    });
    closeReason.associate = (models) => {
        closeReason.hasOne(models.Tickets);
    }
    return closeReason;
}