const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

// import user
const User = require('../models/user');

let opts = {};

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

passport.use(new JWTStrategy(opts, function(jwt_payload, done) {
    let user = User.findById(jwt_payload._id);

    if(user)
        return done(null, user);
    else
        return done(null, false);
}));

module.exports = passport;