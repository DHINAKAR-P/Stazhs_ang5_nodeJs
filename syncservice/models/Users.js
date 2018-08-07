'use strict';
var shortid = require('shortid');

module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
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
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        loggedInDate: DataTypes.DATE,
        loggedOutDate: DataTypes.DATE,
        isDisabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });

    Users.associate = (models) => {
        Users.belongsToMany(models.Authorities, {
            as: "Authorities", through: "UserAuthorities", onDelete: 'cascade'
        })
        Users.belongsTo(models.Organizations, { as: 'organization' });
        Users.belongsToMany(models.Reports, { through: "UserReports" })
        // Users.hasOne(models.Tickets, { as: "assigned_to" });
        Users.hasMany(models.Tickets,{as: "assigned_to"});
        Users.hasOne(models.Tickets, { as: 'created_by' })
    }
    return Users;
}