var request = require("request");
var config = require("./testConfig");


describe("Organizations Api", function () {
  var OrganizationID = {};

   //POST Organizations data
  describe("POST Organizations data", function () {
    it("post Organization returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Organization/create",
        headers: { 'Content-Type': "application/json", 'authorization': "bearer " + config.token },
        body: JSON.stringify({
          "organizationname": "My_Organization",
        })
      };
      request.post(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        OrganizationID = JSON.parse(response.body);
        done();
      });
    });
  });

  //GET Organization BY ID
  describe("TO GET THE Organization BY ID", function () {
    it("get By id Organization returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Organization/get/" + OrganizationID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      })
    })
  })

  //UPDATE Organization DATA 
  describe("UPDATE ORGANIZATION DATA", function () {
    it("update Organization returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Organization/update",
        headers: { 'authorization': "bearer " + config.token },
        body: JSON.stringify({
          "uuid": OrganizationID.uuid,
          "groupname": "testGroup_Updated",
          "OrganizationUuid": config.OrganizationUuid
        })
      };
      request.put(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
  // getAll Organization 
  describe("GET All Organization data ", function () {
    var options = {
      url: config.base_url + "/Organization/getall",
      headers: { 'authorization': "bearer " + config.token }
    };
    it("getall Organization returns status code 200", function (done) {
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  //DELETE Organization BY ID
  describe("TO ORGANIZATION BY ID", function () {
    it("delete By id Organization returns status code 204", function (done) {
      var options = {
        url: config.base_url + "/Organization/delete/" + OrganizationID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(204);
        done();
      })
    })
  })

});