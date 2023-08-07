module.exports.profile = function(req, res){
    return res.end('<h1>User Profile</h1>');
};

module.exports.dashboard = function(req, res){
    return res.end('<h1>User Dashboard</h1>');
};