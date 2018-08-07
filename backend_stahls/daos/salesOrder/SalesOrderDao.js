var models = require("../../models")

module.exports.createSalesOrder = function (SalesOrderDetails, callback) {
    console.log("--- >>  display the is --> ", SalesOrderDetails)
    models.SalesOrder.create(SalesOrderDetails).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getallSalesOrder = function (callback) {
    models.SalesOrder.findAll({
        order:[
            ['OrderDate','DESC']
        ],
        include: [
            {
                model: models.SalesOrderStatus,
            }]
       
        }
    ).then(function (response) {
        if (response.length != 0) {
            callback(response)
        } else {
            callback("There is no Order")
        }

    }).catch(function (error) {
        callback(error)
    })

}

module.exports.getSalesOrderById = function (orderId, callback) {
    console.log("entering into get sales order #@#@#@# ")
    models.SalesOrder.findOne({
             
            where: { OrderID: orderId },
            order:[
                ['OrderDate','DESC']
            ],
            include: [{
                model: models.SalesOrderItems,
                include: [{model: models.SalesOrderDetails}],
                
            },
            {
               model:models.Tickets,
               as:'Ticket',
               include: [{
                   model: models.Users,
                   as: 'assigned_to',
                },{
                    model:models.Users,
                    as: 'created_by',
                }]
            },
            {
                model:models.Shipments,
            }
          ]
       
        }).then(response => {
            if (response.length != 0) {
                callback(response)
            } else {
                callback("There is no Order")
            }
        }).catch(function (error) {
        callback(error)
    })
}

module.exports.delete_SalesOrder = function (orderId, callback) {
    models.SalesOrder.destroy({ where: { OrderID: orderId } }).then(response => {
        callback();
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.update_SalesOrder = function (SalesOrderDetails, callback) {
    models.SalesOrder.update(SalesOrderDetails, { where: { uuid: SalesOrderDetails.uuid } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}