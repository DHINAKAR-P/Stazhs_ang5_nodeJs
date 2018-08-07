var InvoicesService = require("../../services/invoices/InvoicesService")
/**
 * Create Invoices 
 * @param {InvoicesDetaisl} req 
 * @param {Create The Invoices Also With Reports,Groups } res 
 */
module.exports.createInvoices = function (req, res) {
    var InvoicesDetails = req.body;
    InvoicesService.createInvoices(InvoicesDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List Of Invoices 
 * @param {GetAll} req 
 * @param {Getting The List Of Invoices Details From Invoices} res 
 */
module.exports.getallInvoices = function (req, res) {
    InvoicesService.getallInvoices(function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List of Invoices Based On InvoicesId
 * @param {InvoicesiD} req 
 * @param {Getting Particular Invoices Details Based On InvoicesId} res 
 */
module.exports.getInvoicesById = function (req, res) {
    var Invoice_id = req.params.uuid;
    InvoicesService.getInvoicesById(Invoice_id, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Delete The Particular Invoices Based on InvoicesId
 * @param {InvoicesId} req 
 * @param {Delete Paticular Invoices Details Form Invoices Based on InvoicesId} res 
 */
module.exports.delete_Invoices = function (req, res) {
    var Invoice_id = req.params.uuid;
    InvoicesService.delete_Invoices(Invoice_id, function () {
        res.status(204);
        res.end();
    });
}

/**
 * Update Particular Invoices
 * @param {InvoicesId} req 
 * @param {Update Particular Invoices Details Based On It's InvoicesId} res 
 */
module.exports.update_Invoices = function (req, res) {
    var InvoicesDetails = req.body;
    InvoicesService.update_Invoices(InvoicesDetails, function (response) {
        res.json(response);
        res.status(201);
    });
}