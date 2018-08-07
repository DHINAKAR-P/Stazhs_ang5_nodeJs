var models = require("../../models")


module.exports.create_report = function (ReportDetails, callback) {
  models.Reports.create(ReportDetails).then(function (response) {
    callback(response)
  }).catch(function (error) {
    callback(error)
  })
}

module.exports.getallreport = function (callback) {
  models.Reports.findAll().then(function (response) {
    callback(response)
  }).catch(function (error) {
    callback(error)
  })
}

module.exports.getreportById = function (Report_Id, callback) {
  models.Reports.findById(Report_Id).then(function (response) {
    callback(response)
  }).catch(function (error) {
    callback(error)
  })
}

module.exports.getreportByUser = function (Report_Id, callback) {
  models.Reports.findOne({
    where: { uuid: Report_Id },
    include: [{
      model: models.Organizations,
      as: "Organization",
    }]
  }).then(function (response) {
    callback(response)
  }).catch(function (error) {
    callback(error)
  })
}

module.exports.getreportbyorganization = function (OrganizationId, callback) {
  models.Reports.findAll({ where: { OrganizationUuid: OrganizationId } }).then(function (response) {
    if (response != 0) {
      callback(response)
    } else {
      callback(null)
    }
  }).catch(function (error) {
    callback(error)
  })
}

module.exports.delete_report = function (Report_Id, callback) {
  models.Reports.destroy({ where: { uuid: Report_Id } }).then(function (response) {
    callback(response)
  }).catch(function (error) {
    callback(error)
  })
}

module.exports.update_report = function (ReportDetails, callback) {
  models.Reports.update(ReportDetails, { where: { uuid: ReportDetails.uuid } }).then(function (response) {
    callback(response)
  }).catch(function (error) {
    callback(error)
  })
}