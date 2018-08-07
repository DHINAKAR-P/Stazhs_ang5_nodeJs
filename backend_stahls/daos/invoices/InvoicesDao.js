var models = require("../../models")

module.exports.createInvoices = function (InvoicesDetails, callback) {
    models.Invoices.create(InvoicesDetails).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.getallInvoices = function (callback) { 
    models.Invoices.findAll({
        order:[
            ['InvoiceNumber','DESC']
        ],
        include: [
            {
                model: models.InvoiceDetails,
            }
            // {
            //     model: models.SalesOrder,
            // }
        ]
       
        }).then(function (response) {
        if (response.length != 0) {
           
            var count = 0;
            response.forEach((element, i) => {

                if(element.dataValues.PONumber!==null){
                models.SalesOrder.findOne({ where: {PONumber: element.dataValues.PONumber} }).then(Order => {
                                count++;
                                if(Order){
                                  element.dataValues.SalesOrder=Order;
                                }else{element.dataValues.SalesOrder={};}
                                if (count === response.length) {
                                            callback(response)
                                } 
                    })
                }else{element.dataValues.SalesOrder={};}
            });
            
        } else {
            callback("There is no Invoice")
        }

    }).catch(function (error) {
        callback(error)
    })

}

module.exports.getInvoicesById = function (Invoice_id, callback) {
    models.Invoices.findOne({
             
            where: { uuid: Invoice_id },
            order:[
                ['InvoiceNumber','DESC']
            ],
            // include: [
            // {
            //     model: models.OrderItems
            // }]
       
        }).then(response => {
            if (response.length != 0) {
                callback(response)
            } else {
                callback("There is no Invoice")
            }
        }).catch(function (error) {
        callback(error)
    })
}

module.exports.delete_Invoices = function (Invoice_id, callback) {
    models.Invoices.destroy({ where: { uuid: Invoice_id } }).then(response => {
        callback();
    }).catch(function (error) {
        callback(error)
    })
}

module.exports.update_Invoices = function (InvoicesDetails, callback) {
    models.Invoices.update(InvoicesDetails, { where: { uuid: InvoicesDetails.uuid } }).then(function (response) {
        callback(response)
    }).catch(function (error) {
        callback(error)
    })
}