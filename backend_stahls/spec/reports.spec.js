var request = require("request");
var config = require("./testConfig");


describe("Reports Api", function () {
    // getAll Report 
    describe("GET All Report data ", function () {
      var options = {
        url: config.base_url + "/Report/getall",
        headers: { 'authorization': "bearer " + config.token }
      };
      it("getall Report returns status code 200", function (done) {
        request.get(options, function (error, response, body) {
          expect(response.statusCode).toBe(200);
          done();
        });
      });
    });
  
  });