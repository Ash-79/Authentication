const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    const posts = await Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        },
        populate: {
            path: 'likes'
        }
    }).populate('likes');
    
    const users = await User.find({});
    return res.render('home', {
        title: "Home",
        posts: posts,
        all_users: users
    });
};