
var models = require("../../models");
var asyncLoop = require('node-async-loop');

module.exports.create_Ticket = function (TicketDetails, callback) {
    console.log(TicketDetails.salesorder.length)
    if(TicketDetails.salesorder.length!=0){
        models.Tickets.create(TicketDetails).then(function (response) {
            if (response) {
                asyncLoop(TicketDetails.salesorder, (salesorder, next) => {
                    console.log("order in create ticket dao ---- ", salesorder)
                    // salesorder.TicketUuid = response.dataValues.uuid;
                    salesorder.Tickets = salesorder.Tickets + 1;
                    console.log("tickets in this order ---- ", salesorder.Tickets);
                    models.SalesOrder.update(salesorder, { where: { OrderID: salesorder.OrderID } })
                        .then(function (OrderResponse) {
                            var SalesOrderOrder = { SalesOrderOrderID: salesorder.OrderID, TicketUuid: response.dataValues.uuid }
                            models.SalesOrderTickets.create(SalesOrderOrder)
                                .then(function (SalesOrderOrderResponse) {
                                    console.log("mydata test-----------", SalesOrderOrderResponse)
                                }).catch(function (err) {
                                })
                        }).catch(function (err) {
                        })
                    next();
                }, function (err) {
                    if (err) {
                        console.log("error in async")
                    }
                    else {
                        console.log("success in async")
    
                        callback(response)
                    }
                })
            }
    
        }).catch(function (error) {
            callback(error)
        })
    }else {
        models.Tickets.create(TicketDetails).then(function (response) {
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~No salesOrder since Ticket Created ")
            callback(response)
        }).catch(function (error) {
            callback(error)
        })
    }
    
}

module.exports.getall_ticket = function (callback) {
    models.Tickets.findAll({
        order:[
                ['Date','DESC']
            ],
        include: [
            {
                model: models.TicketAttachments,
                as: 'attachments',
            }, {
                model: models.Users,
                as: 'assigned_to'
            }, {
                model: models.Users,
                as: 'created_by'
            }, {
                model: models.SalesOrder,
                order:[
                    ['OrderDate','DESC']
                ],
                as: 'salesorder'
            },
            {
                model: models.Organizations,
                as: 'organization',
            }]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Tickets")
        }
        // console.log("after get all ticket in dao --- ",response);
    }).catch(function (error) {
        // console.log("after get all ticket in dao error ---- ",error);
        callback(error)
    })
}

module.exports.getticketById = function (Ticket_id, callback) {
    console.log('entering into get ticket by id are ------- ');
    models.Tickets.find({
        where: { uuid: Ticket_id },
        include: [
            {
                model: models.TicketAttachments,
                as: 'attachments',
            }, {
                model: models.Users,
                as: 'assigned_to'
            }, {
                model: models.Users,
                as: 'created_by'
            }, {
                model: models.SalesOrder,
                order:[
                    ['OrderDate','DESC']
                ],
                as: 'salesorder'
            }, {
                model: models.CloseReason,
                as: 'CloseReason'
            },
            {
                model: models.Organizations,
                as: 'organization',
            }
        ]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Tickets")
        }
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getticketByOrgId = function (orgId, callback) {
    models.Tickets.findAll({
        where: { organizationUuid: orgId },
        include: [
            {
                model: models.TicketAttachments,
                as: 'attachments',
            }, {
                model: models.Users,
                as: 'assigned_to'
            }, {
                model: models.Users,
                as: 'created_by'
            }, {
                model: models.SalesOrder,
                order:[
                    ['OrderDate','DESC']
                ],
                include: [{ model: models.SalesOrderStatus }],
                as: 'salesorder'
            }, {
                model: models.CloseReason,
                as: 'CloseReason'
            },
            {
                model: models.Organizations,
                as: 'organization',
            }
        ]
    }).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Tickets")
        }
    }).catch(function (error) {
        callback(error)
    })
}



module.exports.update_ticket = function (TicketDetails, callback) {
    // console.log('-----------update-------------',TicketDetails.closingRemarks.uuid);
    models.Tickets.update(TicketDetails, { where: { uuid: TicketDetails.uuid } }).then(function (response) {
        callback(response)
        console.log('-----------resposne-------------', response);
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.delete_ticket = function (Ticket_id, callback) {
    models.Tickets.destroy({ where: { uuid: Ticket_id } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}


