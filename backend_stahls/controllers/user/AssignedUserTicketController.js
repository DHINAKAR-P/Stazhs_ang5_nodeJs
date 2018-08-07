var assignedUserTicketService = require('../../services/user/AssignedUserTicketService');


module.exports.createAssignedUserTickets = function(req,res) {
    var assignedUserTickets = req.body;
    assignedUserTicketService.createAssignedUserTickets(assignedUserTickets,function(response){
        res.status(200);
        res.json(response);
    })
}