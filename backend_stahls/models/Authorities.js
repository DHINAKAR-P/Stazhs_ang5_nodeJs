'use strict';
var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    var Authorities = sequelize.define("Authorities", {
        uuid: {
            type: DataTypes.STRING,
            defaultValue: shortid.generate,
            primaryKey: true
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        role: DataTypes.STRING,
        allowedScreens: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isDisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    Authorities.associate = (models) => {
        Authorities.belongsTo(models.Organizations, { as: 'organization' });
    }

    return Authorities;
}