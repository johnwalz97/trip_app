//Setup modules
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var request = require("request");
var jwt = require("jsonwebtoken");
process.env.JWT_SECRET = "¯\_(ツ)_/¯"

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//Setup app
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "./client/public")));
app.set('views', path.join(__dirname, './client/public'));
app.set('view engine', 'ejs');

//Include db model
require('./server/config/mongoose.js');

//Routes
var routes_setter = require("./server/config/routes.js");
routes_setter(app);

////ignore errors
//process.on('uncaughtException', function(err) {
//    console.log(err);
//});

//Server
app.listen(8000, function() {
    console.log("listening on port 8000");
})