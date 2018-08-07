var AuthorityDao = require("../../daos/authority/AuthoritiesDao")

module.exports.create_authority = function (authority, callback) {
    AuthorityDao.create_authority(authority , function(response, error){
      if(error) {
        callback(null, error);
      } else {
        callback(response);
      }
    })
}


module.exports.getallauthority = function (callback) {
  AuthorityDao.getallauthority(function (response) {
      callback(response)
  })
}

module.exports.getallauthoritybyOrg = function (authority, callback) {
  AuthorityDao.getallauthoritybyOrg(authority, function (response) {
      callback(response)
  })
}

module.exports.getauthorityById = function (authority, callback) {
  AuthorityDao.getauthorityById(authority, function (response) {
      callback(response)
  })
}

module.exports.delete_authority = function (authority, callback) {
  AuthorityDao.delete_authority(authority, function (response) {
      callback(response)
  })
}

module.exports.disable_authority = function (authority, callback) {
  AuthorityDao.disable_authority(authority, function (response) {
      callback(response)
  })
}

module.exports.update_authority = function (authority, callback) {
  AuthorityDao.update_authority(authority, function (response) {
      callback(response)
  })
}

module.exports.get_Role = function (role,orgid, callback) {
  AuthorityDao.get_Role(role,orgid, function (response) {
      callback(response)
  })
}

module.exports.get_RoleNoOrg = function (role, callback) {
  AuthorityDao.get_RoleNoOrg(role, function (response) {
      callback(response)
  })
}