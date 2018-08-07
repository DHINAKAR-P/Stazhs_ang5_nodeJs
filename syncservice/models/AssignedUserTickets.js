'use strict';

module.exports = function(sequelize, DataTypes) {
    var AssignedUserTickets = sequelize.define("AssignedUserTickets", {
        
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
    return AssignedUserTickets;
}