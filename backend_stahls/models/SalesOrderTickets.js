'use strict';

module.exports = function (sequelize, DataTypes) {
    var SalesOrderTickets = sequelize.define("SalesOrderTickets", {
        SalesOrderOrderID: DataTypes.INTEGER,
        TicketUuid: DataTypes.STRING,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    //     SalesOrderTickets.associate = (models) => {
    //     SalesOrder.hasMany(models.SalesOrderItems,{ foreignKey: 'OrderID'})
    //     SalesOrder.belongsToMany(models.Tickets,{through:'SalesOrderTickets',as:'Ticket'})
    //     SalesOrder.hasOne(models.SalesOrderStatus,{ foreignKey: 'OrderID'})
    // };
    return SalesOrderTickets;
}