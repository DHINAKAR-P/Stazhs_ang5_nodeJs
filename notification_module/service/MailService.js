var MailDao = require('../dao/MailDao');

module.exports.createMail = (userId, callback) => {
    MailDao.createMail(userId, function(err, data){
        if(err){
            callback(err);
        }else{
            callback(data);
        }
    })
}