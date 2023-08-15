const User = require('../models/user');

module.exports.profile = async function(req, res){
    if(req.cookies.user_id){
        let user = await User.findById(req.cookies.user_id).exec();
        // console.log(user);
        return res.render('user_profile',{
            title: 'Profile',
            name: user.name,
            email: user.email
        });
    }
    else
        return res.redirect('signin');
};

module.exports.dashboard = function(req, res){
    return res.end('<h1>User Dashboard</h1>');
};

//render the SignUp page
module.exports.signup = function(req, res){
    return res.render('signup', {
        title: "Sign Up"
    })
};

//render the SignIn page
module.exports.signin = function(req, res){
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
module.exports.createSession = async function(req, res){
    //find the user
    let user = await User.findOne({ email: req.body.email }).exec();

    //user found
    if(user){
        //handle password mismatch
        if(user.password != req.body.password){
            console.log("passwprd Mismatch: "+ user.password +" : " +req.body.password);
            return res.redirect('back');
        }
        //create session
        else{
            // console.log(user);
            res.cookie('user_id', user.id);
            console.log(req.cookie);
            return res.redirect('./profile')
        }
    }
    //user not found
    else{
        console.log("User not found");
        return res.redirect('back');
    }
};

module.exports.signout = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('signin');
};