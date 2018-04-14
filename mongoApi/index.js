var express = require('express');
var bodyParser = require('body-parser');
var monk = require('monk');
var mongo = require('mongodb');
var mongoose = require('mongoose');
// create express app
var app = express();

// parser requests of content-type
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type
app.use(bodyParser.json());

// define a simple route
app.get('/', function (req, res) {
    res.json({ "message": "Connected to the MongoDb Nodejs API" });
});

// listen for requests
app.listen(3000, function () {
    console.log("Server is listening to port 3000");
});

// Configuration the database
var dbConfig = require('./config/database.config.js');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function () {
    console.log('Could not connect to the database . Exiting now....');
    process.exit();
});

mongoose.connection.once('open', function () {
    console.log('Successfully connected to the database');
});

var db = monk('localhost:27017/Craiglist');

// Get all Services
app.get('/api/service/all', function (request, result) {
    var collection = db.get('Service');
    collection.find({}, function (err, services) {
        if (err) throw err;
        result.json(services);
    });
});

// Get all service category
app.get('/api/serviceCategory/all', function (request, result) {
    var collection = db.get('serviceCategory');
    collection.find({}, function (err, categories) {
        if (err) throw err;
        result.json(categories);
    });
});

// Delete a service
app.get('/api/service/delete/:serviceId', function (request, result) {
    var collection = db.get('Service');
    collection.remove({ _id: request.params.serviceId }, function (err, services) {
        if (err) throw err;
        result.json(services);
    });
});

// List of services with one category
app.get('/api/serviceCategory/:serviceCategoryId', function (request, result) {
    var collection = db.get('Service');
    collection.find({
        serviceCategoryId: request.params.serviceCategoryId
    }, function (err, categories) {
        if (err) throw err;
        result.json(services);
    });
});

// Hide a specific service for a specific user
app.get('/api/hideService/add/:serviceId/:userId', function (request, result) {
    var collection = db.get('hiddenServices');
    collection.insert({
        serviceId: request.params.serviceId,
        userId: request.params.userId
    }, function (err, categories) {
        if (err) throw err;
        result.json(hiddenservices);
    });
});

// Remove a hidden service for a specific user
app.get('/api/hideService/remove/hiddenServiceId', function (request, result) {
    var collection = db.get('hiddenServices');
    collection.remove({
        _id: request.params.hiddenServiceId
    }, function (err, categories) {
        if (err) throw err;
        result.json(hiddenservices);
    });
});

// Get all users
app.get('/api/user/all', function (request, result) {
    var collection = db.get('users');
    collection.find({}, function (err, users) {
        if (err) throw err;
        result.json(users);
    });
});

// Get specific user
app.get('/api/user/:userId', function (request, result) {
    var collection = db.get('users');
    collection.find({
        _id: request.params.userId
    },
        function (err, users) {
            if (err) throw err;
            result.json(users);
        });
});

// Specific Service by service name (Search Input)
app.get('/api/service/:serviceName', function (request, result) {
    var collection = db.get('Service');
    var value = request.params.serviceName;
    var pattern = ".*" + value + ".*";
    collection.find({ "serviceName": new RegExp(pattern) }, function (err, services) {
        if (err) throw err;
        result.json(services);
    });
});

// Specific Service by service ID
app.get('/api/service/:serviceId', function (request, result) {
    var collection = db.get('Service');
    collection.find({ "_id": request.params.serviceId }, function (err, services) {
        if (err) throw err;
        result.json(services);
    });
});

// User Register
app.get('/api/user/register/:fullName/:password/:emailId', function (request, result) {
    var collection = db.get('users');
    collection.insert({
        fullName: request.params.fullName,
        email: request.params.emailId,
        password: request.params.password
    }, function (err, users) {
        if (err) throw err;
        result.json(users);
    });
});

// Delete a user
app.get('/api/users/delete/:userId', function (request, result) {
    var collection = db.get('users');
    collection.remove({
        _id: request.params.userId
    },
        function (err, users) {
            if (err) throw err;
            result.json(users);
        });
});

// User login
app.get('/api/user/:emailId/:password', function (request, result) {
    var collection = db.get('users');
    collection.find({
        $and: [
            {email: request.params.emailId},
            {password: request.params.password}
        ]     
    },
        function (err, users) {
            if (err) throw err;
            result.json(users);
        });
});

// Update Password
app.get('/api/user/update/:userId/:password', function (request, result) {
    var collection = db.get('users');
    collection.update(
        {_id: request.params.userId},
        {$set: {password: request.params.password}}
    ,
        function (err, users) {
            if (err) throw err;
            result.json(users);
        });
});

// Update Email
app.get('/api/user/update/:userId/:email', function (request, result) {
    var collection = db.get('users');
    collection.update(
        {_id: request.params.userId},
        {$set: {email: request.params.email}}
    ,
        function (err, users) {
            if (err) throw err;
            result.json(users);
        });
});

// Update Details
app.get('/api/user/update/:userId/:address/:city/:state/:zipcode', function (request, result) {
    var collection = db.get('users');
    collection.update(
        {_id: request.params.userId},
        {$set: {address: request.params.address,
            city: request.params.city,
            state: request.params.state,
            zipcode: request.params.zipcode }}
    ,
        function (err, users) {
            if (err) throw err;
            result.json(users);
        });
});

// Update Phone
app.get('/api/user/update/:userId/:phoneno', function (request, result) {
    var collection = db.get('users');
    collection.update(
        {_id: request.params.userId},
        {$set: {phoneNo: request.params.phoneno}}
    ,
        function (err, users) {
            if (err) throw err;
            result.json(users);
        });
});

//Add New Service
app.get('/api/service/add/:name/:quantity/:isavail/:catId/:desc/:userid/:city/:state/:country/:price/:rating/:doc/:dor/:attId/:spamcount', function (request, result) {
    var collection = db.get('Service');
    collection.insert({
        serviceName: request.params.name,
        serviceQuantity: request.params.quantity,
        isAvailable: request.params.isavail,
        serviceCategoryId: request.params.catId,
        serviceDescription: request.params.desc,
        serviceUserId: request.params.userid,
        serviceCity: request.params.city,
        serviceState: request.params.state,
        serviceCountry: request.params.country,
        servicePrice: request.params.price,
        serviceRating: request.params.rating,
        serviceDoc: request.params.doc,
        serviceDor: request.params.dor,
        serviceAttributesId: request.params.attId,
        serviceSpamCount: request.params.spamcount
    }, function (err, users) {
        if (err) throw err;
        result.json(services);
    });
});

