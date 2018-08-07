'use strict';
var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    var TicketAttachments = sequelize.define("TicketAttachments", {
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
        attachmenturl: DataTypes.STRING,
        filename: DataTypes.STRING,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true,
            hierarchy: true
        });

        TicketAttachments.associate = (models) => {
            TicketAttachments.belongsTo(models.Tickets)
        };

    return TicketAttachments;
}

