var TicketAttachmentService = require("../../services/ticket/TicketAttachmentService");

/**
 * @description getting all uploaded file as ticket attachment
 * @param { No params} req 
 * @param {List of files uploaded} res 
 */
module.exports.getalluploadfile = function (req, res) {
    TicketAttachmentService.getalluploadfile(function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.saveFileUrl = function (req, res) {
    var file = req.body;
    TicketAttachmentService.saveFileUrl(file, function (response) {
        res.status(200);
        res.json(response);
    })
}

/**
 * @description get uploaded file 
 * @param { get uploaded file using the UUID} req 
 * @param {List of files uploaded} res 
 */
module.exports.getuploadfilebyid = function (req, res) {
    var FileDetails = req.params.uuid;
    TicketAttachmentService.getuploadfilebyid(FileDetails, function (response) {
        res.json(response);
        res.status(200);
    })
}

/**
 * @description get uploaded file 
 * @param { get uploaded file using the UUID} req 
 * @param {List of files uploaded} res 
 */
module.exports.deleteuploadfile = function (req, res) {
    var FileDetails = req.params.uuid;
    TicketAttachmentService.deleteuploadfile(FileDetails, function (response) {
        res.json(response);
        res.status(200);
    })
}