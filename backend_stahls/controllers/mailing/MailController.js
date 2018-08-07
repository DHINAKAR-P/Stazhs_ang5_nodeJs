var MailService = require('../../services/mailing/MailService');
const nodemailer = require('nodemailer');


module.exports.createMail = (req, res) => {
    var mailData =req.body
    MailService.createMail(mailData, function (masterllistdata, err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(masterllistdata);
        }
    })
}