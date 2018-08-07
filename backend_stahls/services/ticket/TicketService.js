var TicketDao = require("../../daos/ticket/TicketDao")
var async = require("async")
var DateDiff = require('date-diff'); 


module.exports.create_Ticket = function (TicketDetails, callback) {
    TicketDao.create_Ticket(TicketDetails, function (response) {
        callback(response);
    })
}

module.exports.getall_ticket = function (callback) {
    TicketDao.getall_ticket(function (response) {
        callback(response);
    })
}

module.exports.getticketById = function (Ticket_id, callback) {
    TicketDao.getticketById(Ticket_id, function (response) {
        callback(response);
    })
}

module.exports.getticketByOrgId = function (uuid, callback) {
    TicketDao.getticketByOrgId(uuid, function (response) {
        callback(response);
    })
}

module.exports.getticketByUserId = function (UserId, callback) {
    TicketDao.getticketByUserId(UserId, function (response) {
        callback(response);
    })
}

module.exports.update_ticket = function (TicketDetails, callback) {
    TicketDao.update_ticket(TicketDetails, function (response) {
        callback(response);
    })
}

module.exports.delete_ticket = function (Ticket_id, callback) {
    TicketDao.delete_ticket(Ticket_id, function (response) {
        callback(response);
    })
}

module.exports.getticketByStatus_UserId = function (Ticket_Status, User_id, callback) {
    TicketDao.getticketByStatus_UserId(Ticket_Status, User_id, function (response) {
        callback(response);
    })
}

module.exports.getticketByStatus = function (Ticket_Status, callback) {
    TicketDao.getticketByStatus(Ticket_Status, function (response) {
        callback(response)
    })
}



