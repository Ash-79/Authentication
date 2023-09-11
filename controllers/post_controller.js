const Post = require('../models/post');
const comment = require('../models/comment');

module.exports.create = async function(req, res){
    await Post.create({
        content: req.body.content,
        user: req.user._id
    });
    return res.redirect('back');
};

module.exports.destroy = async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        console.log(post.user.toString() +" "+req.user.id.toString());
        if(post){
            if(post.user.toString() === req.user.id.toString()){ // Compare as strings
                await post.deleteOne(); // Use await here

                // Delete all comments associated with the post
                await Comment.deleteMany({ post: req.params.id });

                console.log('Post and associated comments deleted successfully');
            }
        }
    } catch (error) {
        console.error('Error deleting post and associated comments:', error);
    }

    return res.redirect('back');
};
