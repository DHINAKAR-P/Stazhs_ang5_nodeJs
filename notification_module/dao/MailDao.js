let mailer = require('../utils/mailer');
//let FileModel = require('../model/File');
let User = require('../model/user');
let fs = require('fs')
let path = require('path')
// var __dirname = "../static"
//var __dirname = "/home/decoders/Documents";

let docConvertor = require('docx-pdf')

//var Mail = require('../model/Mail');

exports.createMail = (userId, callback) => {
    User.findOne({ id: userId }, function (err, userResponse) {
        if (err) {
            callback(err);
        }
        //  else {
        //     FileModel.findOne({ userId: userId }, function (err, fileResponse) {
        //         if (err) {
        //             callback(err);
        //         } else {

        //      fs.writeFileSync(path.resolve(__dirname, userId+'.docx'), fileResponse.file);
        //      docConvertor(__dirname+"/"+userId+'.docx', __dirname+"/"+userId+'.pdf', function(err, pdfConverterResponse){
        //          if(err){
        //              callback(err);
        //          }
                 else{
                    mailer.sendMail(userResponse.email, userId, function (err, response) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(response);
                        }
                    });
                 }
        //    })
                    
                  
        //         }
        //     });
        // }
    });

}