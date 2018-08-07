var express = require('express');
var router  = express.Router();
var models = require("../models")
var jwt      = require('jsonwebtoken');
var passport = require('passport');


/* POST login. */
router.post('/login', function (req, res, next) {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }

        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }

            var token = jwt.sign(user, 'your_jwt_secret');

            return res.json({user, token});
        });
    })(req,res);

});

router.post('/logout',function(req,res,next){
    console.log('logout service side called ',req.body)
    models.Users.update({loggedOutDate: new Date()}, {where:{uuid:req.body.uuid}}).then(function(res){})
})

module.exports = router;