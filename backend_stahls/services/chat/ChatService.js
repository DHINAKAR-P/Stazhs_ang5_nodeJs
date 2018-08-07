var ChatDao = require("../../daos/chat/ChatDao");

module.exports.create_Chat = function (chatData, callback) {
    ChatDao.create_Chat(chatData, function (response) {
        callback(response);
    })
}

module.exports.getChatByTicketId = function (ticketId, callback) {
    ChatDao.getChatByTicketId(ticketId, function (response) {
        callback(response);
    })
}