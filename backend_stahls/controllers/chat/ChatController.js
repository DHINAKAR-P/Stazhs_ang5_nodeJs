var ChatService = require("../../services/chat/ChatService");

/**
 * Create Chat For Ticketing System
 * @param {UUID,Request(string)} req 
 * @param {Create Chat For Ticketing System} res 
 */
module.exports.create_Chat = function (req, res) {
    var chatData = req.body;
    ChatService.create_Chat(chatData, function (response) {
        res.json(response);
        res.status(201);
    })
}

/**
 * Getting List of Chating Histroy For Ticketing System
 * @param {TicketId} req 
 * @param {Geting The List Of Chats From Ticketing System To View Chat History} res 
 */
module.exports.getChatByTicketId = function (req, res) {
    var ticketId = req.params.ticketid;
    ChatService.getChatByTicketId(ticketId, function (response) {
        res.json(response);
        res.status(200);
    })
}