var nodemailer = require('nodemailer');
var config = require('../config/mailConfig');
//var __dirname = "/home/decoders/Documents";
// var __dirname = "../static"
var fs = require("fs");

exports.sendMail = (mailId, userId, callback) => {
    const transporter = nodemailer.createTransport({
        service: config.mailConfig.EMAIL_SERVICE_MIDDLEWARE,
        auth: {
            user: config.mailConfig.SERVICE_EMAIL,
            pass: config.mailConfig.SERVICE_EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        to: mailId,
        from: config.mailConfig.EMAIL_FROM,
        subject: 'Your contact form',
        text: "",
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
}