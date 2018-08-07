var request = require("request");
var config = require("./testConfig");


describe("User Api", function () {
  var UserID = {};

  // //POST User data
  describe("POST User data", function () {
    it("post User returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/User/create",
        headers: { 'Content-Type': "application/json", 'authorization': "bearer " + config.token },
        body: JSON.stringify({
          "username": "dhina",
          "password": "dhina",
          "firstname": "dhina",
          "lastname": "dhina",
          "email": "dhina@gmail.com",
          "organizationUuid": config.OrganizationUuid,
          "Authorities": [
            {
              "uuid": config.AuthorityUuid,
              "role": "ROLE_ORGANIZATION_ADMIN"
            }
          ]
        })
      };
      request.post(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        UserID = JSON.parse(response.body);
        done();
      });
    });
  });

  // // //GET USER BY ID
  describe("TO GET THE USER BY ID", function () {
    it("get By id User returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/User/get/" + UserID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      })
    })
  })

  // //UPDATE USER DATA 
  describe("UPDATE USER DATA", function () {
    it("update User returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/User/update",
        headers: { 'authorization': "bearer " + config.token },
        body: JSON.stringify({
          "uuid": UserID.uuid,
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
  // getAll Users 
  describe("GET All User data ", function () {
    var options = {
      url: config.base_url + "/User/getall",
      headers: { 'authorization': "bearer " + config.token }
    };
    it("getall User returns status code 200", function (done) {
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  //DELETE User BY ID
  describe("TO DELETE THE USER BY ID", function () {
    it("delete By id User returns status code 204", function (done) {
      var options = {
        url: config.base_url + "/User/delete/" + UserID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.delete(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      })
    })
  })

});