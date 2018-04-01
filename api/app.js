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

// List of all Products
app.get('/api/products/productList', (request, result) => {
    connection.query('SELECT * FROM service', function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Delete a product
app.get('/api/products/delete/:id', (request, result) => {
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
app.get('/api/products/productCategory/:categoryId', (request, result) => {
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
app.get('/api/hideProduct/add/:serviceId/:userId', (request, result) => {
    connection.query("INSERT INTO `hiddenservices` (`serviceId`, `userId`) VALUES (?, ?)", [request.params.serviceId, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

//remove a hidden product for a specific user
app.get('/api/hideProduct/remove/:hiddenProductId/:userId', (request, result) => {
    connection.query("DELETE FROM hiddenservices WHERE hiddenservices.serviceId = ? and hiddeservices.userId= ?", [request.params.hiddenProductId, request.params.userId], function(err, rows, fields){
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
    connection.query("INSERT INTO `users` (`fullName`, `emailId`, `password`) VALUES (?, ? ?)", [request.params.fullName, request.params.emailId, request.params.password], function(err, rows, fields){
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
    connection.query('DELECT FROM users WHERE userId= ?',[request.params.userId], function(err, rows, fields){
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
    connection.query('SELECT * FROM users WHERE userId= ?',[request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Specific Product
app.get('/api/products/:id', (request, result) => {
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
app.get('/api/users/usersList',(request, result) => {
    connection.query('SELECT * FROM users', function(err, rows, fields){
        if(err){
            console.log('something went wrong !');
        }
        else{
            result.send(rows); 
        }
    });
});
