'use strict';

module.exports = function (sequelize, DataTypes) {
    var Chat = sequelize.define("Chat", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        request: DataTypes.STRING,
        status: DataTypes.STRING,
        escalate: DataTypes.STRING,
        createdTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
            hierarchy: true
        });

    Chat.associate = (models) => {
        Chat.belongsTo(models.Users, { as: 'user', foreignKey: 'UserUuid' });

    };

    return Chat;
}

