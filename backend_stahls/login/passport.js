var passport = require('passport');
var passportJWT = require("passport-jwt");

var ExtractJWT = passportJWT.ExtractJwt;

var LocalStrategy = require('passport-local').Strategy;
var JWTStrategy = passportJWT.Strategy;
var models = require("../models")


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, cb) {
console.log("username and password dare ---- ",username,password)
        //Assume there is a DB module pproviding a global UserModel
        return models.Users.findOne({
            include: [
                {
                    model: models.Authorities,
                    required: false,
                    as: "Authorities",
                    attributes: ['uuid', 'role', 'allowedScreens'],
                    through: { attributes: [] }
                },
                {
                    model: models.Organizations,
                    as: "organization"
                }],


            where: { username: username, password: password }
        })
            .then(function (user) {
                console.log("user details are ------ ",user)
                if (!user.dataValues) {
                    return cb(null, false, { message: 'Incorrect username or password.' });
                }
                else{
                    console.log("loggin date is ----- ", new Date());
                 user.update({loggedInDate: new Date()}).then(function(res){})
                return cb(null, user.dataValues, {
                    message: 'Logged In Successfully'
                });
            }
            })
            .catch(err => {
                console.log("error in passport js ----- ",err)
                return cb(err);
            });
    }
));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
},
    function (jwtPayload, cb) {
        //find the user in db if needed
        return models.Users.findById(jwtPayload.uuid)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));