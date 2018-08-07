'use strict';

module.exports = function(sequelize, DataTypes) {
    var UserReports = sequelize.define("UserReports", {
        
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
      },{
        timestamps: false,
        createdAt: false,
        updatedAt: false,
        freezeTableName:true
    });
    return UserReports;
}