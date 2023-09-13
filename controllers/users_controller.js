const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = async function(req, res){
    const user = await User.findById(req.params.id);
    return res.render('profile', {
        title: "Profile",
        profile_user: user
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

//update user details
module.exports.update = async function(req, res){
    if(req.user.id.toString() == req.params.id.toString()){
        let user = await User.findById(req.params.id);
        User.uploadedAvatar(req, res, function(err){
            if(err)
                console.log('***Multer Error: ', err);
            user.name = req.body.name;
            user.email = req.body.email;

            if(req.file){
                //remove the previous avatar of the user
                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                }

                user.avatar = User.avatarPath +'/'+ req.file.filename;
            }
            user.save();
        });
    }
    return res.redirect('/');
}

//create the session
module.exports.createSession = async function(req, res){
    
    let logged_user = await User.findOne({email: req.body.email});
    return res.redirect('./profile/'+logged_user.id);
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