var ReportService = require("../../services/report/ReportService")

module.exports.create_report = function (req, res) {
    var ReportDetails = req.body;
    ReportService.create_report(ReportDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getallreport = function (req, res) {
    ReportService.getallreport(function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getreportById = function (req, res) {
    var Report_Id = req.params.uuid;
    ReportService.getreportById(Report_Id, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getreportByUser = function (req, res) {
    var User_Id = req.params.userid;
    ReportService.getreportByUser(User_Id, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.getreportbyorganization = function (req, res) {
    var OrganizationId = req.params.organizationid;
    ReportService.getreportbyorganization(OrganizationId, function (response) {
        res.json(response);
        res.status(200);
    })
}

module.exports.delete_report = function (req, res) {
    var Report_Id = req.params.uuid;
    ReportService.delete_report(Report_Id, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.update_report = function (req, res) {
    var ReportDetails = req.body;
    ReportService.update_report(ReportDetails, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.assing_user = function (req, res) {
    var User_Id = req.body.userid;
    var Report_Id = req.body.reportid;
    var data = {
        UserUuid: User_Id,
        ReportUuid: Report_Id
    }
    ReportService.assing_user(data, function (response) {
        res.json(response);
        res.status(201);
    })
}


module.exports.remove_user = function (req, res) {
    var User_Id = req.body.userid;
    var Report_Id = req.body.reportid;
    var data = {
        UserUuid: User_Id,
        ReportUuid: Report_Id
    }
    ReportService.remove_user(data, function (response) {
        res.json(response);
        res.status(201);
    })
}


module.exports.assing_group = function (req, res) {
    var Group_Id = req.body.groupid;
    var Report_Id = req.body.reportid;
    var data = {
        GroupUuid: Group_Id,
        ReportUuid: Report_Id
    }
    ReportService.assing_group(data, function (response) {
        res.json(response);
        res.status(201);
    })
}

module.exports.remove_group = function (req, res) {
    var Group_Id = req.body.groupid;
    var Report_Id = req.body.reportid;
    var data = {
        GroupUuid: Group_Id,
        ReportUuid: Report_Id
    }
    ReportService.remove_group(data, function (response) {
        res.json(response);
        res.status(201);
    })
}
