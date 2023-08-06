const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server : ${port}`);
    }
    console.log(`Server is running in port : ${port}`);
});