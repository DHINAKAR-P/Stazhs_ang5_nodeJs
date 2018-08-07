var express = require("express");
var routers = require("./routers");


var api = express.Router();

api.use("/User", routers.UserRouter);
api.use("/Authorities", routers.AuthoritiesRouter);
api.use("/Organization", routers.OrganizationRouter)
api.use("/Group", routers.GroupRouter);
api.use("/GroupUsers", routers.GroupUsersRouter);
api.use("/Ticket", routers.TicketRouter);
api.use("/file", routers.TicketAttachmentRouter);
api.use("/Report", routers.ReportRouter);
api.use("/loggerDetails", routers.LoggerRouter);
api.use("/Chat", routers.ChatRouter);
api.use("/Inventory", routers.InventoryRouter);
api.use("/OrderItem", routers.OrderItemRouter);
api.use("/PurchaseOrders", routers.PurchaseOrdersRouter);
api.use("/Invoices", routers.InvoicesRouter);
api.use("/PurchaseOrderItems", routers.PurchaseOrderItemsRouter);
api.use("/Mail", routers.MailingRouter);
api.use("/CloseReason", routers.CloseReason);
//api.use("/ShipmentsRouter", routers.ShipmentsRouter);
api.use("/InventoryItems", routers.InventoryItems);
api.use("/assignedUserTicket",routers.AssignedUserTicket);
api.use("/SalesOrder", routers.SalesOrderRouter);

api.use("/Shipments", routers.ShipmentsRouter);

module.exports = api;
