var request = require("request");
var config = require("./testConfig");

describe("Ticket Api", function () {
    var ticketID = {};
    //Create ticket
    describe("Create Ticket", function () {
        it("return status code 200", function (done) {
            var options = {
                url: config.base_url + "/Ticket/create",
                headers: { 'Content-Type': "application/json", 'authorization': "bearer " + config.token },
                body: JSON.stringify({
                    "severity": "testseverity",
                    "priority": "testPriorty",
                    "status": "testStatus",
                    "subject": "testSubject",
                    "description": "testDescription",
                    "escalate": "testEscalate",
                    "time": "2018-04-14",
                    "changetime": "2018-04-14",
                    "timestamps": "false",
                    "createdAt": "false",
                    "updatedAt": "false",
                    "freezeTableName": "true",
                    "hierarchy": "true"
                })
            };
            request.post(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                ticketID = JSON.parse(response.body);
                done();
            });
        })
    });

    //Get All tickets
    describe("Get All Tickets", function () {
        var options = {
            url: config.base_url + "/Ticket/getall",
            headers: { 'authorization': "bearer " + config.token }
        };
        it("returns the status for tickets with 200", function (done) {
            request.get(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        })
    })

    //Get Ticket By Id
    describe("Get Ticket By Id", function () {
        it("get By id ticket returns status code 200", function (done) {
            var options = {
                url: config.base_url + "/Ticket/get/" + ticketID.uuid,
                headers: { 'authorization': "bearer " + config.token }
            };
            request.get(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })

    //Update Ticket
    describe("Update Ticket ", function () {
        it("update ticket returns status code 200", function (done) {
            var options = {
                url: config.base_url + "/Ticket/update",
                headers: { 'authorization': "bearer " + config.token },
                body: JSON.stringify({
                    "uuid": ticketID.uuid,
                    "severity": "testseverity",
                    "priority": "testPriorty",
                    "status": "testStatus",
                    "subject": "testSubject",
                    "description": "testDescription",
                    "escalate": "testEscalate",
                    "time": "2018-04-14",
                    "changetime": "2018-04-14",
                    "timestamps": "false",
                    "createdAt": "false",
                    "updatedAt": "false",
                    "freezeTableName": "true",
                    "hierarchy": "true"
                })
            };
            request.put(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });
    });

    //Delete Ticket By Id
    describe("To Delete Ticket By Id", function () {
        it("delete By id ticket returns status code 204", function (done) {
            var options = {
                url: config.base_url + "/Ticket/delete/" + ticketID.uuid,
                headers: { 'authorization': "bearer " + config.token }
            };
            request.delete(options, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            })
        })
    })
})