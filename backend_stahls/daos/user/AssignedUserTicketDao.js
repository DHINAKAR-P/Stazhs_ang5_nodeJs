asyncLoop = require('node-async-loop');
model = require('../../models');




module.exports.createAssignedUserTickets = function (assignedUserTickets, callback) {
    console.log("assigned user ticket dao values are ---- ", assignedUserTickets);
    asyncLoop(assignedUserTickets.assignedUsers, (element, next) => {
        model.AssignedUserTickets.findAll({
            where: { TicketUuid: assignedUserTickets.ticketUuid }
        }).then(function (data) {
            if (data != null) {
                asyncLoop(data, (element2, next) => {
                    model.AssignedUserTickets.destroy({
                        where: { TicketUuid: assignedUserTickets.ticketUuid }
                    }).then(function (response) {
                        model.AssignedUserTickets.create({
                            TicketUuid: assignedUserTickets.ticketUuid,
                            UserUuid: element.uuid
                        }).then(function (response) {
                            console.log("successfully inserting values in dao $$$ ", response)
                            next(response);
                        }).catch(function (error) {
                            console.log("failure to inserting values in dao %&^&^& ", error)
                            next(error);
                        })
                    })
                })
            } else {
                model.AssignedUserTickets.create({
                    TicketUuid: assignedUserTickets.ticketUuid,
                    UserUuid: element.uuid
                }).then(function (response) {
                    console.log("successfully inserting values in dao $$$ ", response)
                    next(response);
                }).catch(function (error) {
                    console.log("failure to inserting values in dao %&^&^& ", error)
                    next(error);
                })
            }
        })

        next();
    }, function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback('success');
        }
    })
}





//each api call to insert values 

// module.exports.createAssignedUserTickets = function (assignedUserTickets, callback) {
//     console.log("assigned user ticket dao values are ---- ", assignedUserTickets);
//     //     model.AssignedUserTickets.create({
//     //         TicketUuid: '193ab782-3256-4046-a2f9-25dc91260a74',
//     //         UserUuid: '04f592cf-d207-473c-88c0-2032a4638e52'
//     //     }).then(function (response) {
//     // console.log("assigned user ticvket response success  ---- ",response)
//     //     }).catch(function (error) {
//     // console.log("assigned user ticket response error ------ ",error)
//     //     })
//     asyncLoop(assignedUserTickets.assignedUsers, (element, next) => {
//         model.AssignedUserTickets.find({
//             where: {
//                 TicketUuid: assignedUserTickets.ticketUuid.uuid,
//                 UserUuid: element.uuid
//             }
//         }).then(function (response) {
//             if (response == null) {
//                 model.AssignedUserTickets.create({
//                     TicketUuid: assignedUserTickets.ticketUuid.uuid,
//                     UserUuid: element.uuid
//                 }).then(function (response) {
//                     console.log("successfully inserting values in dao $$$ ",response)
//                     next();
//                 }).catch(function (error) {
//                     console.log("failure to inserting values in dao %&^&^& ",error)
//                     next();
//                 })
//             } else if(response != null) {
//                 response.destroy().then(function(response){
//                     console.log("success to delete assigned user ---- ")
//                     next(response);
//                 }).catch(function(error){
//                     console.log("failure to delete the data --- ")
//                     next(error);
//                 })
//             } else{
//                 next();
//             }
//             console.log("find all obbject valeus in success  ", response)
//         }).catch(function (error) {
//             console.log("find all object values in failure  ", error)
//             next(error);
//         })
//         next();
//     }, function (err) {
//         if (err) {

//         }
//         else {

//         }
//     })
// }