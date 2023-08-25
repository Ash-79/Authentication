const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async function(email, password, done){
        //find a user and establish the identity
        let user = await User.findOne({email: email}).exec();

        if(!user || user.password != password){
            console.log("User not found or Incorrect password");
            return done(null, false);
        }
        return done(null, user);
    }
));

//Serialize the user which key is to be kept in the cookie
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deserialize the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    let user = await User.findById(id).exec();
    if(!user){
        console.log("Error while finding the user");
        return done(null, false);
    }
    return done(null, user);
});

//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if authenticated
    if(req.isAuthenticated()){
        return next();
    }
    //if not 
    return res.redirect('/users/signin');
};

//what to do if user is authenticated
passport.setAuthenicatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contains the current user from session cookie and we are sending it to res locals
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;