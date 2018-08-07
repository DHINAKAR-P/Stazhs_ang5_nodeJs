'use strict';
module.exports = function (sequelize, DataTypes) {
    var Config = sequelize.define("StahlsConfig", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: DataTypes.STRING,
        label: DataTypes.STRING,
        description: DataTypes.STRING,
        value: DataTypes.STRING,
        sub_type: DataTypes.STRING,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    return Config;
}