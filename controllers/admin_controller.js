module.exports.dashboard = function(req, res){
    return res.render('admin', {
        title: "Admin"
    });
}