var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var port = 4200;
var cors = require('cors');

// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://admin:password@ds261479.mlab.com:61479/mern-app')
    .then(() => { // if success
        console.log('Start');
    })
    .catch(err => { // if error
        console.error('App starting error: ', err.stack);
        process.exit(1);
    });
// Required application specific custom router module
var itemRouter = require('./src/routes/itemRouter');
// Use middleware to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/items', itemRouter);

// start the server
app.listen(port, function() {
    console.log('listening on port: ',port);
});