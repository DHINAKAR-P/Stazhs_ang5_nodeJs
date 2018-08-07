var multer = require('multer');
var fileLocation = require('../config/config')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, fileLocation.imageUploadLocation);
    },
    filename: function (req, file, callback) {
        callback(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage }).single('file');

module.exports.uploadfile = function (req, res) {
        upload(req, res, function (err) {
            if (err) {
                res.status(501).json({ error: err });
            }
            res.status(200);
            if (req.file) {
                res.json({ filename: req.file.filename, path: req.file.path })
            }
        });
}