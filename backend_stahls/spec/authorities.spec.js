var request = require("request");
var config = require("./testConfig");


describe("Authorities Api", function () {
  //Create Authority
  var groupID = {};
  describe("Create Authorities for User", function () {
    it("returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Authorities/create",
        headers: { 'Content-Type': "application/json", 'authorization': "bearer " + config.token },
        body: JSON.stringify({
          "role": "ROLE_DHINA",
        })
      };
      request.post(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        groupID = JSON.parse(response.body);
        done();
      });
    });
  });

  //GET AUTHORITY BY ID
  describe("TO GET THE AUTHORITY BY ID", function () {
    it("get By id Authorities returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Authorities/get/" + groupID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      })
    })
  })

  //UPDATE AUTHORITY DATA 
  describe("UPDATE AUTHORITY DATA", function () {
    it("update group returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Authorities/update",
        headers: { 'authorization': "bearer " + config.token },
        body: JSON.stringify({
          "uuid": groupID.uuid,
          "role": "ROLE_UPDATE_DHINA"
        })
      };
      request.put(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });


  // Get ALL AUTHORITY
  describe("GET All AUTHORITY DATA ", function () {

    it("getall Authorities returns status code 200", function (done) {
      var options = {
        url: config.base_url + "/Authorities/getall",
        headers: { 'authorization': "bearer " + config.token }
      };
      request.get(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });

  //DELETE AUTHORITY
  describe("TO DELETE THE AUTHORITY BY ID", function () {
    it("delete By id Authorities returns status code 204", function (done) {
      var options = {
        url: config.base_url + "/Authorities/delete/" + groupID.uuid,
        headers: { 'authorization': "bearer " + config.token }
      };
      request.delete(options, function (error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      })
    })
  })
});


