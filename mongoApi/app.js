var express = require('express');
var bodyParser = require('body-parser');
var monk = require('monk');

// create express app
var app = express();

// parser requests of content-type
app.use(bodyParser.urlencoded({extended: true}));

// parse requests of content-type
app.use(bodyParser.json());

// define a simple route
app.get('/', function (req, res) {
    res.json({"message": "Connected to the MongoDb Nodejs API"});
});

// listen for requests
app.listen(3000, function(){
    console.log("Server is listening to port 3000");
});

// Configuration the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function(){
    console.log('Could not connect to the database . Exiting now....');
    process.exit();
});

mongoose.connection.once('open', function(){
    console.log('Successfully connected to the database');
});

var db = monk('localhost:27017/Craiglist');

// get all Services
app.get('/api/service/all', function(request, result){
    var collection = db.get ('service');
    collection.find({}, function(err, services){
        if (err) throw err;
        result.json(services);
    });
});

// get all users
app.get('/api/user/all', function(request, result){
    var collection = db.get('users');
    collection.find({}, function(err, users){
        if (err) throw err;
        result.json(users);
    });
});

// get all service category
app.get('/api/serviceCategory/all', function(request, result){
    var collection = db.get('serviceCategory');
    collection.find({}, function(err, categories){
        if (err) throw err;
        result.json(categories);
    });
});

// get service by search
app.get('/api/service/:searchInput', function(request, result){
    var collection= db.get('service');
    collection.find({}, function(err, services){
        if (err) throw err;
        result.json(services);
    });
});

// get service by category

// 