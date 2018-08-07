var express = require('express');
var router = express.Router();
var controller = require('../../controllers/user/AssignedUserTicketController');


router.post('/create',controller.createAssignedUserTickets);

module.exports = router;