var mysql = require('mysql');
var express = require('express');
var app = express();
var router = express.Router();
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'craiglist'
});
connection.connect();

app.use(function(request, result, next) {
    result.header("Access-Control-Allow-Origin", "*");
    result.header("Access-Control-Allow-Headers", "Origin, X-requestuested-With, Content-Type, Accept");
    next();
});

app.listen(3000, () => {
    console.log(`https://localhost:3000`);
});

app.use(function(request, result, next) {
    result.header("Access-Control-Allow-Origin", "*");
    result.header("Access-Control-Allow-Headers", "Origin, X-requestuested-With, Content-Type, Accept");
    next();
  });

  app.get('/', (request, result) => {
    console.log('Connected to NodeJS Services');
    result.send('Connected to NodeJS Services');
});

// List of all services
app.get('/api/service/all', (request, result) => {
    connection.query('SELECT * FROM service', function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// services by a specific user
app.get('/api/service/getByUser/:userId', (request, result) => {
    connection.query("select * from service where serviceUserId = ? ", [request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// product categories all
app.get('/api/service/serviceCategoriesAll',(request, result) =>{
    connection.query('Select * from serviceCategory', function(err, rows, fields){
        if (err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Delete a product
app.get('/api/service/delete/:id', (request, result) => {
    connection.query("DELETE FROM service WHERE service.serviceId=?",[request.params.id], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});


// List of products with one category
app.get('/api/service/serviceCategory/:categoryId', (request, result) => {
    connection.query("SELECT * FROM service WHERE serviceCategoryId= ?",[request.params.categoryId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// hide a specific product for a specific user
app.get('/api/hideService/add/:serviceId/:userId', (request, result) => {
    connection.query("INSERT INTO `hiddenservices` (`serviceId`, `userId`) VALUES (?, ?)", [request.params.serviceId, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

//remove  hidden product for a specific user
app.get('/api/hideService/remove/:hiddenProductId/:userId', (request, result) => {
    connection.query("DELETE FROM hiddenservices WHERE hiddenservices.serviceId = ? and hiddeservices.userId= ?", [request.params.hiddenProductId, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

//get hidden product for a specific user
app.get('/api/hideService/get/:userId', (request, result) => {
    connection.query("SELECT * FROM service, hiddenservices WHERE hiddenservices.serviceId = service.serviceId and hiddenservices.userId= ?", [request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

//get wishlist for a specific user
app.get('/api/wishlist/get/:userId', (request, result) => {
    connection.query("SELECT * FROM wishlist WHERE wishlist.wishlistUserId = ?", [request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

//get wishlistitems from a wishlist for a specific user
app.get('/api/wishlistitems/get/:wishlistId', (request, result) => {
    connection.query("SELECT * FROM wishlistitems WHERE wishlistitems.wishlistId = ?", [request.params.wishlistId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// user register
app.get('/api/users/register/:fullName/:password/:emailId', (request, result) => {
    connection.query("INSERT INTO users (`fullName`, `emailId`, `password`) VALUES (?, ?, ?)", [request.params.fullName, request.params.emailId, request.params.password], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// user login
app.get('/api/users/login/:emailId/:password', (request, result) => {
    connection.query("SELECT * from users WHERE emailId= ? and password= ?",[request.params.emailId, request.params.password], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Change Password
app.get('/api/users/changePassword/:userId/:newPassword',(request, result) => {
    connection.query("UPDATE users SET users.password= ? WHERE userId= ?",[request.params.newPassword,request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Change PhoneNo
app.get('/api/users/changePhoneNo/:userId/:phoneNo', (request, result) => {
    connection.query('Update users set users.phoneNo = ? where userId = ?', [request.params.phoneNo, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// change Address
app.get('/api/users/changeAddress/:userId/:address/:city/:state/:country/:zipcode',(request, result) => {
    connection.query('update users set users.address= ?, users.city= ?, users.state= ?, users.country= ?, users.zipcode= ? where users.userId= ?', [request.params.address, request.params.city, request.params.state, request.params.country, request.params.zipcode, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Change Email
app.get('/api/users/changeEmail/:userId/:newEmail', (request, result) => {
    connection.query('UPDATE users SET users.emailId= ? WHERE userId= ?',[request.params.newEmail, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// delete a user
app.get('/api/users/delete/:userId', (request, result) => {
    connection.query('DELETE FROM users WHERE userId= ?',[request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Specific User 
app.get('/api/users/get/:id', (request, result) => {
    connection.query('SELECT * FROM users WHERE userId = ?',[request.params.id], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
            console.log(rows);
        }
    });
});

// Specific Product
app.get('/api/service/:id', (request, result) => {
    connection.query('SELECT * FROM service WHERE serviceId= ?',[request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// List of all users
app.get('/api/users/usersListAll',(request, result) => {
    connection.query('SELECT * FROM users', function(err, rows, fields){
        if(err){
            console.log('something went wrong !');
        }
        else{
            result.send(rows); 
        }
    });
});

// service by search Input
app.get('/api/services/searchInput/:searchInput', (request, result) => {
    console.log("SELECT * FROM `service` WHERE service.serviceName LIKE '%"+request.params.searchInput+"%'");
    connection.query("SELECT * FROM `service` WHERE service.serviceName LIKE '%"+request.params.searchInput+"%'", function(err, rows, fields){
        if(err){
            console.log(err)
        }
        else{
            result.send(rows);
        }
    });
});

// check if the user exists 
app.get('/api/users/findUser/:emailId', (request, result) => {
    console.log("select * from users where users.emailId="+request.params.emailId);
    connection.query("select * from users where users.emailId='"+request.params.emailId+"'", function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            if(rows.length > 0){
                // result.send("User Exists");
                result.send(rows);
            }
            else{
                // result.send("User does not exist");
                result.send(rows);
            }
        }
    });
});