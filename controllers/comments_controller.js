const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    const post = await Post.findById(req.body.post);
    if(post){
        const comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        post.comments.push(comment);
        post.save();
        return res.redirect('back');
    }
    return res.redirect('back');
};


module.exports.destroy = async function(req, res){
    // console.log(req.params.id);
    try {
        const comment = await Comment.findById(req.params.id);
        // console.log(comment.user._id.toString()+" "+req.user.id);
        if (comment && comment.user._id.toString() === req.user.id.toString()) {
            const postId = comment.post;
            await comment.deleteOne(); // Use await here
            await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
        }
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
    return res.redirect('back');
};

// module.exports.destroy = async function(req, res){
//     console.log(req.params.id);
//     const comment = await Comment.findById(req.params.id);
//     if(comment && comment.user.id == req.user.id){
//         let postId = comment.post;
//         comment.deleteOne({id: req.params.id});
//         await Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
//     }
//     return res.redirect('back');
// };