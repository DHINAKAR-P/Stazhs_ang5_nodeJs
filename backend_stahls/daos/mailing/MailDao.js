let mailer = require('../../config/mailer');
//let FileModel = require('../model/File');
let Users = require('../../models/Users');
let fs = require('fs')
let path = require('path')
var models = require("../../models")

exports.createMail = (mailData, callback) => {
    console.log("entering into maildao method ------- ")

    if (mailData.Status === "close") {

        console.log("request body-1-------->", mailData)
        var userId = mailData.created_by.uuid;
        var firstname = mailData.created_by.firstname;
        var assigned_to = mailData.assigned_to[0].firstname;
        var reason = mailData.closingRemarks.Reason;
        var email = mailData.created_by.email;
        var ticketno = mailData.id;
        var orderid = mailData.salesorder[0].OrderID;

        //var mailContent = "Hi " + firstname + " , \n\n Ticket No : " + ticketno + "\t has been closed by :" + assigned_to + "\n Reason:" + reason + "\n Order ID : " + orderid + " "
        
        var mailContent = {"firstname": firstname , "ticketno": ticketno , "closedby" : assigned_to , "reason" : reason , "orderId" : orderid ,"type":"close","ticketuid":mailData.uuid }
        mailer.sendMail(email, userId, mailContent, function (MailResponse) {
            callback(MailResponse)
        })

    }
    if (mailData.Status === 'Assigned' ) {

        console.log("request body-2-------->", mailData)
        if (mailData.assigned_to.length != 0) {
            var userId = mailData.assigned_to.uuid;
            var firstname = mailData.assigned_to[0].firstname;
            var email = mailData.assigned_to[0].email;
            var ticketno = mailData.id;
            if (mailData.salesorder.length > 0) {
                var orderid = mailData.salesorder[0].OrderID;
            } else {
                var orderid = " - ";
            }

            //var mailContent = "Hi " + firstname + " , \n\n Ticket No : " + ticketno + " assigned to you. \n Order ID : " + orderid + " ";
            var mailContent = {"firstname": firstname , "ticketno": ticketno , "orderId" : orderid,"type":"assign","ticketuid":mailData.uuid }            
            mailer.sendMail(email, userId, mailContent, function (MailResponse) {              
                callback(MailResponse)
            })

        } else {          
            callback("mail not sent")
        }
    }

    if(mailData.Status==='Open'){

        console.log("create mail ------------>",mailData)
            var userId = mailData.createdByUuid;
            var firstname = mailData.createdByUser.firstname;
            var email = mailData.createdByUser.email;
            var ticketno = mailData.ticket.id;
            if (mailData.salesorder.length > 0) {
                var orderid = mailData.salesorder[0].OrderID;
            } else {
                var orderid = " - ";
            }

            //var mailContent = "Hi " + firstname + " , \n\n Ticket No : " + ticketno + " assigned to you. \n Order ID : " + orderid + " ";
            var mailContent = {"firstname": firstname , "ticketno": ticketno ,"ticketuid":mailData.ticket.uuid, "orderId" : orderid,"type":"create" }            
            mailer.sendMail(email, userId, mailContent, function (MailResponse) {              
                callback(MailResponse)
            })
    }

}