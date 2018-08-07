'use strict';

module.exports = function(sequelize, DataTypes) {
    var GroupReports = sequelize.define("GroupReports", {
        
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
    return GroupReports;
}