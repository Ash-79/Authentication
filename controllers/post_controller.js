const Post = require('../models/post');
const comment = require('../models/comment');
const Like = require('../models/like');

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

                // Delete all likes associated with the post and all its comments
                await Like.deleteMany({likeable: post, onModel: 'Post'});
                await Like.deleteMany({_id: {$in: post.comments}});
                
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
