module.exports = function (sequelize, DataTypes) {
    var SyncService = sequelize.define("SyncService", {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },

        SyncConfig:DataTypes.STRING,
        SyncOperation: DataTypes.BOOLEAN,
        SyncStatus: DataTypes.STRING,      
        SyncTable: DataTypes.STRING,
        DataExportDate:DataTypes.DATEONLY,
        DataImportDate:DataTypes.DATE,

        createdAt:{
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,      
        },
        updatedAt:{
            type: DataTypes.DATE,
        },
        
    }, {
            freezeTableName: true,
            hierarchy: true
        });


    return SyncService;
}

