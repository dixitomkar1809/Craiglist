var mysql = require('mysql');
var express = require('express');
var multer = require('multer');
// var upload = multer({ dest: 'D:/Projects/Craiglist/CraiglistFrontEnd/src/assets/uploads/' });
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "C:/Users/Tushar Chemburkar/Desktop/College/Spring 2018/Web Programming Languages/Project/images/")
    },
    filename:function(req, file, cb){
        cb(null, Date.now()+'.jpg')
    }
})
var upload = multer({ storage:storage });
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
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

  app.get('/', (request, result) => {
    console.log('Connected to NodeJS Services');
    result.send('Connected to NodeJS Services');
});

// Upload Image/File
app.post('/uploadImage', upload.single("productImage"), (request, result) => {
    // result.send(request.file.body["destination"]+request.file.body["filename"]+".jpg");
    result.send(request.file);
    console.log(result);
});

app.post('/api/setImage', (request, result) => {
    // console.log(request.body);
    // result.send(request.body);
    connection.query('UPDATE `serviceimages` SET `serviceImageName`= ? WHERE `serviceId`= ?', [request.body.imgPath, request.body.value], function(err, rows, fields) {
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    })
});

// get all images of a service
app.get('/api/service/getImages/:id', (request, result) => {
    connection.query('select * from serviceimages where serviceId = ?', [request.params.id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(rows);
        }
    });
});

// set image path to some service
app.get('/api/service/setImage/:id/:path', (request, result) => {
    // 
});

// List of all services
app.get('/api/service/all/:userid', (request, result) => {
    connection.query('SELECT service.*, serviceimages.serviceImageName FROM service, serviceimages WHERE service.serviceId = serviceimages.serviceId AND service.serviceId AND service.isAvailable = 1 and service.serviceId not in (select serviceId from hiddenservices where hiddenservices.userId = ?)', [request.params.userid], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// services by a specific user
app.get('/api/service/getByUser/:userId', (request, result) => {
    connection.query("select service.*, serviceimages.serviceImageName from service, serviceimages where service.serviceId = serviceimages.serviceId and serviceUserId = ? ", [request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// product categories all
app.get('/api/service/serviceCategoriesAll', (request, result) => {
    connection.query('Select * from serviceCategory', function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// Delete a product
app.get('/api/service/delete/:id', (request, result) => {
    connection.query("DELETE FROM service WHERE service.serviceId=?", [request.params.id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});


// List of products with one category
app.get('/api/service/serviceCategory/:categoryId/:userId', (request, result) => {
    connection.query("SELECT service.*, serviceimages.serviceImageName FROM service, serviceimages WHERE service.serviceId = serviceimages.serviceId AND service.serviceId AND service.isAvailable = 1 and service.serviceCategoryId = ? and service.serviceId not in (select serviceId from hiddenservices where hiddenservices.userId = ?)" , [request.params.categoryId, request.params.userId] , function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// hide a specific product for a specific user
app.get('/api/hideService/add/:serviceId/:userId', (request, result) => {
    connection.query("INSERT INTO `hiddenservices` (`serviceId`, `userId`) VALUES (?, ?)", [request.params.serviceId, request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

//remove  hidden product for a specific user
app.get('/api/hideService/remove/:hiddenProductId/:userId', (request, result) => {
    connection.query("DELETE FROM hiddenservices WHERE hiddenservices.serviceId = ? and hiddenservices.userId= ?", [request.params.hiddenProductId, request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

//get hidden product for a specific user
app.get('/api/hideService/get/:userId', (request, result) => {
    connection.query("SELECT service.*, serviceimages.serviceImageName FROM service, hiddenservices, serviceimages WHERE hiddenservices.serviceId = service.serviceId and hiddenservices.userId= ? AND service.serviceId = serviceimages.serviceId ", [request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// user register
app.get('/api/users/register/:fullName/:password/:emailId', (request, result) => {
    connection.query("INSERT INTO users (`fullName`, `emailId`, `password`) VALUES (?, ?, ?)", [request.params.fullName, request.params.emailId, request.params.password], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// user login
app.get('/api/users/login/:emailId/:password', (request, result) => {
    connection.query("SELECT * from users WHERE emailId= ? and password= ?", [request.params.emailId, request.params.password], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// Change Password
app.get('/api/users/changePassword/:userId/:newPassword', (request, result) => {
    connection.query("UPDATE users SET users.password= ? WHERE userId= ?", [request.params.newPassword, request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// Change PhoneNo
app.get('/api/users/changePhoneNo/:userId/:phoneNo', (request, result) => {
    connection.query('Update users set users.phoneNo = ? where userId = ?', [request.params.phoneNo, request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// change Address
app.get('/api/users/changeAddress/:userId/:address/:city/:state/:country/:zipcode', (request, result) => {
    connection.query('update users set users.address= ?, users.city= ?, users.state= ?, users.country= ?, users.zipcode= ? where users.userId= ?', [request.params.address, request.params.city, request.params.state, request.params.country, request.params.zipcode, request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// Change Email
app.get('/api/users/changeEmail/:userId/:newEmail', (request, result) => {
    connection.query('UPDATE users SET users.emailId= ? WHERE userId= ?', [request.params.newEmail, request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err.sqlMessage);
            result.send("Email Already Exist");
        }
        else {
            result.send(rows);
        }
    });
});

// delete a user
app.get('/api/users/delete/:userId', (request, result) => {
    connection.query('DELETE FROM users WHERE userId= ?', [request.params.userId], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// Specific User 
app.get('/api/users/get/:id', (request, result) => {
    connection.query('SELECT * FROM users WHERE userId = ?', [request.params.id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
            console.log(rows);
        }
    });
});

// Specific Product
app.get('/api/service/:id', (request, result) => {
    connection.query('SELECT service.*, serviceimages.serviceImageName, servicecategory.serviceCategoryName FROM service, serviceimages, servicecategory WHERE service.serviceId = ? AND service.serviceId = serviceimages.serviceId AND service.serviceCategoryId = servicecategory.serviceCategoryId ', [request.params.id], function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            result.send(rows);
        }
    });
});

// List of all users
app.get('/api/users/usersListAll', (request, result) => {
    connection.query('SELECT * FROM users', function (err, rows, fields) {
        if (err) {
            console.log('something went wrong !');
        }
        else {
            result.send(rows); 
        }
    });
});

// service by search Input
app.get('/api/services/searchInput/:searchInput/:userId', (request, result) => {
    // SELECT service.*, serviceimages.serviceImageName FROM service, serviceimages WHERE service.serviceId = serviceimages.serviceId AND service.serviceId AND service.isAvailable = 1 and service.serviceName like '%first%' and service.serviceId not in (select serviceId from hiddenservices where hiddenservices.userId = 1)
    // console.log("SELECT service.*, serviceimages.serviceImageName FROM service, serviceimages WHERE service.serviceId = serviceimages.serviceId AND service.serviceId AND service.isAvailable = 1 and service.serviceName like '%"+request.params.searchInput+"%' and service.serviceId not in (select serviceId from hiddenservices where hiddenservices.userId ="+ request.params.userId+" )");
    connection.query("SELECT service.*, serviceimages.serviceImageName FROM service, serviceimages WHERE service.serviceId = serviceimages.serviceId AND service.serviceId AND service.isAvailable = 1 and service.serviceName like '%"+request.params.searchInput+"%' and service.serviceId not in (select serviceId from hiddenservices where hiddenservices.userId ="+ request.params.userId+" )", function (err, rows, fields) {
        if (err) {
            console.log(err)
        }
        else {
            result.send(rows);
        }
    });
});

// check if the user exists 
app.get('/api/users/findUser/:emailId', (request, result) => {
    console.log("select * from users where users.emailId=" + request.params.emailId);
    connection.query("select * from users where users.emailId='" + request.params.emailId + "'", function (err, rows, fields) {
        if (err) {
            console.log(err);
        }
        else {
            if (rows.length > 0) {
                // result.send("User Exists");
                result.send(rows);
            }
            else {
                // result.send("User does not exist");
                result.send(rows);
            }
        }
    });
});

// add Service
app.post('/api/service/addService', urlEncodedParser, (request, result) => {
    // result.send(request.body);
    connection.query("INSERT INTO `service`(`serviceName`, `serviceCategoryId`, `serviceDescription`, `serviceUserId`, `servicePrice`) VALUES (?,?,?,?,?)", [request.body.addServiceName, request.body.addServiceCategory.serviceCategoryId, request.body.addServiceDesc, request.body.userId, request.body.addServicePrice], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            // console.log(rows);
            // result.send(rows);
            connection.query('INSERT INTO `serviceimages`(`serviceImageName`, `serviceId`) VALUES (?,?)',['C:/Users/Tushar Chemburkar/Desktop/College/Spring 2018/Web Programming Languages/Project/images/temp.jpg' , rows["insertId"]], function(err, rows, fields){
                if(err){
                    console.log(err);
                }
                else{
                    // result.send(rows);
                }
            });
            result.send(rows)
        }
    });
    // INSERT INTO `service`(`serviceName`, `serviceCategoryId`, `serviceDescription`, `serviceUserId`, `servicePrice`) VALUES ('trial name', 1, 'trial Desc', 1, 25) 
});


// activate user
app.get('/api/users/activateUser/:id', (request, result) => {
    connection.query("UPDATE users SET isActive=1 WHERE userId = ?", [request.params.id], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// deactivate user
app.get('/api/users/deactivateUser/:id', (request, result) => {
    connection.query("UPDATE users SET isActive=0 WHERE userId= ?", [request.params.id], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// Update Service
app.get('/api/service/updateService/:serviceName/:servicePrice/:serviceDesc/:serviceId', (request, result) => {
    connection.query("UPDATE service SET service.serviceName = ?, service.servicePrice = ?, service.serviceDescription = ? WHERE service.serviceId = ?", [request.params.serviceName,request.params.servicePrice,request.params.serviceDesc,request.params.serviceId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    })
})


// add service to wish list
app.get(`/api/wishlist/add/:serviceId/:userId`, (request, result) => {
    console.log(request.params);
    connection.query('INSERT INTO `wishlist`(`wishlistServiceId`, `wishlistUserid`) VALUES (?,?)', [request.params.serviceId, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// get wishlist service details
app.get('/api/wishlist/get/:userId', (request, result) => {
   connection.query('select service.*, serviceimages.serviceImageName FROM service, serviceimages, wishlist where service.serviceId = wishlist.wishlistServiceId and wishlist.wishlistUserid = ? and serviceimages.serviceId = service.serviceId ', [request.params.userId], function(err, rows, fields){
       if(err){
           console.log(err);
       }
       else{
           result.send(rows);
       }
   })
});

// remove from wishlist
app.get('/api/wishlist/remove/:serviceId/:userId', (request, result) => {
    connection.query('DELETE FROM `wishlist` WHERE wishlist.wishlistServiceId = ? and wishlist.wishlistUserid = ?', [request.params.serviceId, request.params.userId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// discontinue a service
app.get('/api/service/discontinue/:serviceId', (request, result) => {
    connection.query('UPDATE `service` SET `isAvailable`= 0 WHERE serviceId = ?', [request.params.serviceId], function(err, rows, fields){
        if (err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});

// continie a service
app.get('/api/service/continue/:serviceId',(request, result) => {
    connection.query('UPDATE `service` SET `isAvailable`= 1 WHERE serviceId = ?', [request.params.serviceId], function(err, rows, fields){
        if (err){
            console.log(err);
        }
        else{
            result.send(rows);
        }
    });
});


// serachby inputand filter
app.get('/api/service/get/:searchInput/:categoryId', (request, result) => {
    connection.query('SELECT service.*, serviceimages.serviceImageName FROM service, serviceimages WHERE service.serviceId = serviceimages.serviceId AND service.serviceId AND service.isAvailable = 1 and service.serviceCategoryId = ? and service.serviceName like "%'+request.params.searchInput+'%" and service.serviceId not in (select serviceId from hiddenservices where hiddenservices.userId = 1)', [request.params.categoryId], function(err, rows, fields){
        if(err){
            console.log(err);
        }
        else{
            console.log(rows);
            result.send(rows);
        }
    })
})