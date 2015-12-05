//Variables
var users = require("../controllers/users.js");
var trips = require("../controllers/trips.js");
var request = require("request");

//export module
module.exports = function(app){
    //Routes
    app.get("/", function(req, res){
        res.render('trip');
    })
    
    //login
    app.post("/users/user", function(req, res){
        users.login(req, res);
    })
    
    //creating a user
    app.post("/users/create", function(req, res){
        users.create(req, res);
    })
    
    //checking if an email exists
    app.get("/users/emails/:email", function(req, res){
        users.check_email(req, res);
    })

    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.send(403);
        }
    }
    //map directions data
    app.get("/maps/:origin", function(req, res){/*ensureAuthorized(req, res, function(){*/
        var url = "https://maps.googleapis.com/maps/api/directions/json?" + req.params.origin;
        request(url, function(err, response, body){
            res.json(body)
        })
    });
    
    //create a trip in the db
    app.post("/trips/create", function(req, res){/*ensureAuthorized(req, res, function(){*/
        trips.create(req, res);
    })
    
    //getting all trips
    app.get("/trips", function(req, res){/*ensureAuthorized(req, res, function(){*/
        trips.find(req,res);
    })
}