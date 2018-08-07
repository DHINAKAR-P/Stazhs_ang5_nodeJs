var InvoicesDao = require("../../daos/invoices/InvoicesDao")

module.exports.createInvoices = function (InvoicesDetails, callback) {
    InvoicesDao.createInvoices(InvoicesDetails, function(response){
        callback(response);
    })
}

module.exports.getallInvoices = function (callback) {
    InvoicesDao.getallInvoices(function(response){
        callback(response)
    })
}

module.exports.getInvoicesById = function (Invoice_id, callback) {
    InvoicesDao.getInvoicesById(Invoice_id,function(response){
        callback(response)
    })
}

module.exports.delete_Invoices = function (Invoice_id, callback) {
    InvoicesDao.delete_Invoices(Invoice_id, function () {
       callback();
    });
}

module.exports.update_Invoices = function (InvoicesDetails, callback) {
    InvoicesDao.update_Invoices(InvoicesDetails, function (response) {
        callback(response)
    });
}