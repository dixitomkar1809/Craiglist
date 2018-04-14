var express = require('express');
var bodyParser = require('body-parser');
var monk = require('monk');
var mongo = require('mongodb');

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
var mongoose = require('mongoose');

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
        result.json(categories);
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
        result.json(categories);
    });
});

//remove a hidden service for a specific user
app.get('/api/hideService/remove/hiddenServiceId', function (request, result) {
    var collection = db.get('hiddenServices');
    collection.remove({
        _id: request.params.hiddenServiceId
    }, function (err, categories) {
        if (err) throw err;
        result.json(categories);
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
app.get('/api/user/:', function (request, result) {
    var collection = db.get('users');
    collection.find({
        email: request.params.useremail,
        password: request.params.password
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

// // user register
// app.get('/api/users/register/:fullName/:password/:emailId', (request, result) => {
//     connection.query("INSERT INTO `users` (`fullName`, `emailId`, `password`) VALUES (?, ? ?)", [request.params.fullName, request.params.emailId, request.params.password], function(err, rows, fields){
//         if(err){
//             console.log(err);
//         }
//         else{
//             result.send(rows);
//         }
//     });
// });

// // delete a user
// app.get('/api/users/delete/:userId', (request, result) => {
//     connection.query('DELETE FROM users WHERE userId= ?',[request.params.userId], function(err, rows, fields){
//         if(err){
//             console.log(err);
//         }
//         else{
//             result.send(rows);
//         }
//     });
// });

// // user login
// app.get('/api/users/login/:emailId/:password', (request, result) => {
//     connection.query("SELECT * from users WHERE emailId= ? and password= ?",[request.params.emailId, request.params.password], function(err, rows, fields){
//         if(err){
//             console.log(err);
//         }
//         else{
//             result.send(rows);
//         }
//     });
// });

// // Change Password
// app.get('/api/users/changePassword/:userId/:newPassword',(request, result) => {
//     connection.query("UPDATE users SET users.password= ? WHERE userId= ?",[request.params.newPassword,request.params.userId], function(err, rows, fields){
//         if(err){
//             console.log(err);
//         }
//         else{
//             result.send(rows);
//         }
//     });
// });

// // Change Email
// app.get('/api/users/changeEmail/:userId/:newEmail', (request, result) => {
//     connection.query('UPDATE users SET users.emailId= ? WHERE userId= ?',[request.params.newEmail, request.params.userId], function(err, rows, fields){
//         if(err){
//             console.log(err);
//         }
//         else{
//             result.send(rows);
//         }
//     });
// });




