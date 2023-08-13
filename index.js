const express = require('express');
const path = require('path');
const port = 8000;

//accessing the database
const db = require('./config/mongoose');

const app = express();

// use express router
app.use('/', require('./routes/index'));

// setup the view engine ejs
app.set('view engine', 'ejs');
app.set('path', './views');

// setup the static files
app.use(express.urlencoded());
app.use(express.static('assets'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${port}`);
    }
    console.log(`Server is running in port : ${port}`);
});