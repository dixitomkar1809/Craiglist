var mysql = requestuire('mysql');
var expresults = requestuire('expresults');
var app = expresults();
var router = expresults.Router();
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
    connection.query('select * from product', function(err, rows, fields){
        if(err){
            console.log('something went wrong !');
        }
        else{
            console.log(rows);
            // result.send(rows);
        }
    });
});

// Delete a product
app.get('/api/products/delete/:id', (request, result) => {
    console.log("delete product with id " + request.params.id);
});


// List of products with one category
app.get('/api/products/productCategory/:categoryId', (request, result) => {
    console.log("products with category Id ", request.params.categoryId);
    connection.query('select * from product where categoryId='+request.params.categoryId, function(err, rows, fields){
        if(err){
            console.log('something went wrong !');
        }
        else{
            console.log(rows);
            // result.send(rows);
        }
    });
});

// hide a specific product for a specific user
app.get('/api/hideProduct/add/:productId/:userId', (request, result) => {
    console.log("ProductId UserId ",request.params.productId, request.params.userId );
});

//remove a hidden product for a specific user
app.get('api/hideProduct/remove/:productId/:userId', (request, result) => {
    console.log("ProductId UserId ", request.params.productId, request.params.userId);
});

// user register
app.get('/api/users/register/:username/:password/:emailId', (request, result) => {
    console.log("User Register ",request.params.username, request.params.password, request.params.emailId);
});

// user login
app.get('/api/users/login/:username/:password', (request, result) => {
    console.log("User login creds ",request.params.username, request.params.password);
});

// Change Password
app.get('/api/users/changePassword/:newPassword',(request, result) => {
    console.log(request.params.newPassword);
});

// Change Email
app.get('/api/users/changeEmail/:newEmail', (request, result) => {
    console.log("New EmailId ", request.params.newEmail);
});

// delete a user
app.get('/api/users/delete/:id', (request, result) => {
    console.log("delete user with id ", request.params.id);
});

// Specific User 
app.get('/api/users/get/:id', (request, result) => {
    console.log("User Id " + request.params.id);
    connection.query('select * from users where userId='+request.params.id, function(err, rows, fields){
        if(err){
            console.log('something went wrong !');
        }
        else{
            console.log(rows);
            // result.send(rows);
        }
    });
});

// Specific Product
app.get('/api/products/:id', (request, result) => {
    console.log("product Id - " + request.params.id);
});

// List of all users
app.get('/api/users/usersList',(request, result) => {
    console.log("print Users list");
    connection.query('select * from users', function(err, rows, fields){
        if(err){
            console.log('something went wrong !');
        }
        else{
            console.log(rows);
            // result.send(rows);
        }
    });
});
