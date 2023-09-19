const Post = require('../../../models/post');

module.exports.index = async function(req, res){
    let posts = await Post.find({}).populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec();

    return res.status(200).json({
        message: "List of Posts in v1",
        posts: posts
    });
}