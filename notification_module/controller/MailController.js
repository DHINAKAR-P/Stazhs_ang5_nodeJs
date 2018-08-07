var MailService = require('../service/MailService');
const nodemailer = require('nodemailer');


module.exports.createMail = (req, res) => {
    var userId = req.params.id;

    MailService.createMail(userId, function (masterllistdata, err) {
        console.log("--------------->",masterllistdata)

        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(masterllistdata);
        }
    })
}