var models = require("../../models")
var asyncLoop = require('node-async-loop')


module.exports.getalluploadfile = function (callback) {
    models.TicketAttachments.findAll().then(function (response) {
        if (response.length != 0) {
            callback(response)
        }
        else {
            callback("There is no attachments")
        }
    }).catch(function (err) {
        callback(err);
    })
}

module.exports.saveFileUrl = function (file, callback) {
    asyncLoop(file.attachmenturl, (item, next) => {

        var fileDetails = {};
        fileDetails.attachmenturl = item.path;
        fileDetails.filename = item.filename;
        fileDetails.TicketUuid = file.TicketUuid;
        models.TicketAttachments.create(fileDetails);
        next();
    }, function (err) {
        if (err) {
            console.log("error in save url")
            callback(err)
        }
        else {
            callback("fileAttachmentUrl saved")
        }
    })
}

module.exports.getuploadfilebyid = function (FileDetails, callback) {
    models.TicketAttachments.findAll({
        where: { uuid: FileDetails }
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        }
        else {
            callback(null)
        }
    }).catch(function (err) {
        callback(err);
    })
}

module.exports.deleteuploadfile = function (FileDetails, callback) {
    models.TicketAttachments.destroy({
        where: { uuid: FileDetails }
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        }
        else {
            callback(null)
        }
    }).catch(function (err) {
        callback(err);
    })
}