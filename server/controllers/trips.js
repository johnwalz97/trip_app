var mongoose = require("mongoose");
var Trip = mongoose.model("Trip");

module.exports = {
    find: function(req, res){
        Trip.find({}, function(err, trips){
            if (err) {
                res.json({error: err})
            } else {
                res.json(trips)
            }
        })
    },
    create: function(req, res){
        var trip = new Trip({start: req.body.trip.start, destination: req.body.trip.destination, beginDate: req.body.trip.beginDate, endDate: req.body.trip.endDate, _user: req.body.user});
        console.log(trip);
        trip.save(function(err, trip){
            if (err) {
                res.json({error: err})
            } else {
                res.json({trip: trip})
            }
        })
    }
}