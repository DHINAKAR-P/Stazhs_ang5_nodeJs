'use strict';

module.exports = function (sequelize, DataTypes) {
    var Groups = sequelize.define("Groups", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
        },
        groupname: DataTypes.STRING,
    }, {
            timestamps: false,
            createdAt: false,
            updatedAt: false,
            freezeTableName: true
        });
    Groups.associate = (models) => {
        Groups.belongsTo(models.Organizations)
        Groups.belongsToMany(models.Users, { through: "GroupUsers" })
        Groups.belongsToMany(models.Reports,{ through: "GroupReports"})
    };

    return Groups;
}

