'use strict';
var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    var Tickets = sequelize.define("Tickets", {
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
        Date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        Type: DataTypes.STRING,
        description: DataTypes.STRING,
        Status: DataTypes.STRING,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
            hierarchy: true
        });

    Tickets.associate = (models) => {
        Tickets.hasMany(models.TicketAttachments, { as: 'attachments' })
        Tickets.belongsTo(models.CloseReason,{ as: 'CloseReason'})
        // Tickets.hasMany(models.SalesOrder, { as: 'salesorder' })
        Tickets.belongsToMany(models.SalesOrder,{through:'SalesOrderTickets',as:'salesorder'})
        Tickets.belongsToMany(models.Users,{ through: 'AssignedUserTickets', as: 'assigned_to' })
        Tickets.belongsTo(models.Users, { as: 'created_by' })
        Tickets.belongsTo(models.Organizations, { as: 'organization' });
    }
    return Tickets;
}

