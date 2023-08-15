const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
//accessing the database
const db = require('./config/mongoose');

//middleware
app.use(express.urlencoded());

//cookie parser
app.use(cookieParser());

//setup static files
app.use(express.static('./assets'));

// use express router
app.use('/', require('./routes'));

// setup the view engine ejs
app.set('view engine', 'ejs');
app.set('path', './views');


app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${port}`);
    }
    console.log(`Server is running in port : ${port}`);
});