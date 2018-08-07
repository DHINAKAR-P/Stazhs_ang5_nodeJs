var request = require("request");
var config = require("./testConfig");

describe("Groups Api", function () {
  var groupID = {};

  // //POST group data
  describe("POST group data", function () {
    it("post group returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Group/create",
        headers: { 'Content-Type': "application/json", 'authorization': "bearer " +  config.token },
        body: JSON.stringify({
          "groupname": "testGroup",
          "OrganizationUuid": config.OrganizationUuid
        })
      };
      request.post(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        groupID = JSON.parse(response.body);
        done();
      });
    });
  });

  // // //GET GROUP BY ID
  describe("TO GET THE GROUP BY ID", function () {
    it("get By id group returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Group/get/" + groupID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      })
    })
  })

  // //UPDATE GROUP DATA 
  describe("UPDATE GROUP DATA", function () {
    it("update group returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Group/update",
        headers: { 'authorization': "bearer " + config.token },
        body:JSON.stringify( {
          "uuid": groupID.uuid,
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
  // getAll Groups 
  describe("GET All group data ", function () {
    var options = {
      url: config.base_url + "/Group/getall",
      headers: { 'authorization': "bearer " + config.token }
    };
    it("getall group returns status code 200", function (done) {
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  //DELETE GROUP BY ID
  describe("TO DELETE THE GROUP BY ID", function () {
    it("delete By id group returns status code 204", function (done) {
      var options = {
        url: config.base_url + "/Group/delete/" + groupID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.delete(options, function (error, response, body) {
        expect(response.statusCode).toBe(204);
        done();
      })
    })
  })

});