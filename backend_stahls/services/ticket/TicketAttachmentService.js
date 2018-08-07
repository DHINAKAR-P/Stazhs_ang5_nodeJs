var TicketAttachmentDao = require("../../daos/ticket/TicketAttachmentDao")

module.exports.saveFileUrl = function (file, callback) {
    TicketAttachmentDao.saveFileUrl(file, function (response) {
        callback(response);
    })
}

module.exports.getalluploadfile = function (files, ticket_id, callback) {
    TicketAttachmentDao.getalluploadfile(files, ticket_id, function (response) {
        callback(response)
    })
}

module.exports.getuploadfilebyid = function (FileDetails, callback) {
    TicketAttachmentDao.getuploadfilebyid(FileDetails, function (response) {
        callback(response)
    })
}


module.exports.deleteuploadfile = function (FileDetails, callback) {
    TicketAttachmentDao.deleteuploadfile(FileDetails, function (response) {
        callback(response)
    })
}
