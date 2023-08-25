const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('profile', {
        title: "Profile"
    });
};

module.exports.dashboard = function(req, res){
    return res.end('<h1>User Dashboard</h1>');
};

//render the SignUp page
module.exports.signup = function(req, res){
    if(req.isAuthenticated())
        return res.redirect('/users/profile');
    
    return res.render('signup', {
        title: "Sign Up"
    })
};

//render the SignIn page
module.exports.signin = function(req, res){
    if(req.isAuthenticated())
        return res.redirect('/users/profile');
    
    return res.render('signin', {
        title: "Sign In"
    })
};

//get the sign up data
module.exports.create = async function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    let exist = await User.findOne({ email: req.body.email }).exec();
    if(exist){
        return res.redirect('back');
    }
    await User.create(req.body);
    return res.redirect('./signin');
};

//create the session
module.exports.createSession = function(req, res){
    return res.redirect('./profile');
};

module.exports.deleteSession = function(req, res){
    req.logout(function(err){
        if(err){
            console.log('Error in deleting the session');
            return;
        }
        return res.redirect('/users/signin');
    });
};