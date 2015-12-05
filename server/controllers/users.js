var mongoose = require("mongoose");
var User = mongoose.model("User");
var jwt = require("jsonwebtoken");

module.exports = {
    create: function(req, res){
        User.findOne({email: req.body.email, password: req.body.password}, function(err, user) {
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: false,
                        data: "User already exists!"
                    });
                } else {
                    var userModel = new User({first_name: req.body.first, last_name: req.body.last, email: req.body.email, password: req.body.password});
                    userModel.save(function(err, user) {
                        user.token = jwt.sign(user, process.env.JWT_SECRET);
                        user.save(function(err, user1) {
                            res.json({
                                type: true,
                                data: user1,
                                token: user1.token
                            });
                        });
                    })
                }
            }
        });
    },
    check_email: function(req, res){
        User.findOne({email: req.params.email}, function(err, email){
            if (err) {
                res.json({errors: err});
            } else if (email) {
                res.json({email: true})
            } else {
                res.json({email: false})
            }
        })
    },
    login: function(req, res){
        User.findOne({email: req.body.email, password: req.body.password}, function(err, user){
            if (err) {
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                   res.json({
                        type: true,
                        data: user,
                        token: user.token
                    }); 
                } else {
                    res.json({
                        type: false,
                        data: "Incorrect email/password"
                    });    
                }
            }
        })
    }
}