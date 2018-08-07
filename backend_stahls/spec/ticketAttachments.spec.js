var request = require("request");
var config = require("./testConfig");

describe("TicketAttachments Api", function () {
  // getAll TicketAttachments 
  describe("GET All TicketAttachments data ", function () {
    var options = {
      url: config.base_url + "/file/getall",
      headers: { 'authorization': "bearer " + config.token }
    };
    it("getall group TicketAttachments status code 200", function (done) {
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
 
});