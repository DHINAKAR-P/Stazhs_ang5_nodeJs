'use strict';

module.exports = function(sequelize, DataTypes) {
    var UserAuthorities = sequelize.define("UserAuthorities", {

        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    },
      {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName:true
    });
    return UserAuthorities;
}