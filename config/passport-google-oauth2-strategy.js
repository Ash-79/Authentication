const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { ClientRequest } = require('http');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: "561488948428-ggr33mpd4jnpgkgc29tdbru6h2j7l094.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "https://localhost:8000/users/auth/google/callback"
    },
    async function(accessToken, refreshTOken, profile, done){
        let user = await User.findOne({email: profile.emails[0].value});
        if(user){
            return done(null, user);
        }
        else{
            user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            });
            return done(null, user);
        }
    }
));

module.exports = passport;
