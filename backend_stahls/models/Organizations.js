'use strict';
var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    var Organizations = sequelize.define("Organizations", {
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
        organizationname: DataTypes.STRING,
        orgImage: DataTypes.STRING,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    Organizations.associate = (models) => {
        Organizations.hasMany(models.Groups)
        Organizations.hasMany(models.Reports)
    };
    return Organizations;
}
