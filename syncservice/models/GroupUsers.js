'use strict';

module.exports = function(sequelize, DataTypes) {
    var GroupUsers = sequelize.define("GroupUsers", {
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
    return GroupUsers;
}