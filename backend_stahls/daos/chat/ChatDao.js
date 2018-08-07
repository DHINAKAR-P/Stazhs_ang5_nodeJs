var models = require("../../models");

module.exports.create_Chat = function (chatData, callback) {
    models.Chat.create(chatData).then(function (response) {
        callback(chatData);
    }).catch(function (response) {
        callback(response);
    })
}

module.exports.getChatByTicketId = function (ticketId, callback) {
    models.Chat.findAll({
        where: { TicketUuid: ticketId },
        include: [{
            model: models.Users,
            as: 'user',
            attributes: {
                exclude: ['password']
            }
        }, {
            model: models.Users,
            as: 'assignto',
            attributes: {
                exclude: ['password']
            }
        }, {
            model: models.Tickets,
            include: [{
                model: models.Users,
                as: 'user',
                attributes: {
                    exclude: ['password']
                }
            }]

        }]
    }).then(function (response) {
        callback(response);
    }).catch(function (response) {
        callback(response);
    })
}