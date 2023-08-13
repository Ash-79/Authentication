const mongoose = require('mongoose');

const uri = 'mongodb+srv://akashroynet:akashroy69@cluster0.nbgik9s.mongodb.net/Authentication';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

let db = mongoose.connection;