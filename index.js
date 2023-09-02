const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
//accessing the database
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

//middleware
app.use(express.urlencoded());

//cookie parser
app.use(cookieParser());

//setup static files
app.use(express.static('./assets'));


// setup the view engine ejs
app.set('view engine', 'ejs');
app.set('path', './views');

app.use(session({
    name: "Auth App",
    //todo change the secret before deployment in production mode
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 60)
    },
    store: MongoStore.create({
        mongoUrl:     'mongodb+srv://akashroynet:akashroy69@cluster0.nbgik9s.mongodb.net/Authentication',
        autoRemove: 'disabled'
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenicatedUser);

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${port}`);
    }
    console.log(`Server is running in port : ${port}`);
});