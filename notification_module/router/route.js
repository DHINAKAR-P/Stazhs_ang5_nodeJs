var express = require('express');
var apiRouter = express.Router();
var MailController = require('../controller/MailController');

apiRouter.post('/send/mail/:id',MailController.createMail);

module.exports = apiRouter;