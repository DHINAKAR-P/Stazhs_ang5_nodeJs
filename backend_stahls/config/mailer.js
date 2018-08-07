var nodemailer = require('nodemailer');
var config = require('./mailConfig');
//var __dirname = "/home/decoders/Documents";
// var __dirname = "../static"
var fs = require("fs");
var handlebars = require('handlebars');
var htmlToSend = null;
  

exports.sendMail = (mailId, userId, mailContent, callback) => {
    console.log("entering into sendMail Dao ------ ",mailId,userId,mailContent);

    
    var readHTMLFile = function(path, callback) {
        fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
            if (err) {
                throw err;
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    
    readHTMLFile(config.mailConfig.MailTemplateLocation, function(err, html) {
        var template = handlebars.compile(html);
       
        if(mailContent.type==="assign"){
        var replacements = {
            username: mailContent.firstname,
            ticketno: mailContent.ticketno,
            orderId: mailContent.orderId, 
            content:"has been Assingend to you!",  
            urlTicket:config.mailConfig.baseUrl+"/ticketdetails?uuid="+mailContent.ticketuid,
            urlOrder:config.mailConfig.baseUrl+"/order-detail?orderId="+mailContent.orderId
        };
        }

        if(mailContent.type==="close"){
            var replacements = {
                username: mailContent.firstname,
                ticketno: mailContent.ticketno,
                orderId: mailContent.orderId, 
                content:"has been Closed!",
                urlTicket:config.mailConfig.baseUrl+"/ticketdetails?uuid="+mailContent.ticketuid,
               urlOrder:config.mailConfig.baseUrl+"/order-detail?orderId="+mailContent.orderId   
            };
        }

        if(mailContent.type==="create"){
            var replacements = {
                username: mailContent.firstname,
                ticketno: mailContent.ticketno,
                orderId: mailContent.orderId, 
                content:"has been created by You!",
                urlTicket:config.mailConfig.baseUrl+"/ticketdetails?uuid="+mailContent.ticketuid,
                urlOrder:config.mailConfig.baseUrl+"/order-detail?orderId="+mailContent.orderId   
            };
        }

        htmlToSend = template(replacements);
        //console.log("test readfile------->",htmlToSend)

        const transporter = nodemailer.createTransport({
            service: config.mailConfig.EMAIL_SERVICE_MIDDLEWARE,
            auth: {
                user: config.mailConfig.SERVICE_EMAIL,
                pass: config.mailConfig.SERVICE_EMAIL_PASSWORD
            }
        });
    
        
      
    
        const mailOptions = {
            
            to: mailId,
            from: config.mailConfig.SERVICE_EMAIL,
            subject: 'Ticket Notification!',
            //text: mailContent,
            html: htmlToSend
            // attachments: [
            //     {
            //         'filename': "contract.pdf",
            //         'path': __dirname + "/" + userId + ".pdf"
    
            //     }
            // ]
        };

        transporter.sendMail(mailOptions)
        .then((result) => {
            if (result != null) {
                //fs.unlink(__dirname + "/" + userId + ".docx", function () { });
                callback({ message: 'Success' })
            }

            // callback({message: 'Mail Sent'});
        });


    });     

   


    

    
}