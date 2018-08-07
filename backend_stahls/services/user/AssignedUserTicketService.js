var assignedUserTicketDao = require('../../daos/user/AssignedUserTicketDao');


module.exports.createAssignedUserTickets = function(assignedUserTickets , callback) {
    assignedUserTicketDao.createAssignedUserTickets(assignedUserTickets,function(response){
        callback(response);
    })
}