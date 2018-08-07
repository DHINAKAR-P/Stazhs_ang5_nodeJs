var MailDao = require('../../daos/mailing/MailDao');

module.exports.createMail = (mailData, callback) => {
    MailDao.createMail(mailData, function(err, data){
        if(err){
            callback(err);
        }else{
            callback(data);
        }
    })
}