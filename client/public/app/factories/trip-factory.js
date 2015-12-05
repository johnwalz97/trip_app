angular.module("TripApp").factory("tripFactory", function(){
    factory = {};
    factory.getTrips = function(callback){
        $.get(
            "/trips",
            function (response) {
                factory.trips = response;
                callback(response);
            },
            "json"
        )
    }
    factory.saveTrip = function(trip, user){
        console.log(user);
        $.post(
            "/trips/create",
            {trip: trip, user: user},
            function(err, response){
                if (response, err) {
                    console.log(err);
                } else {
                    console.log(response);
                }
            },
            "json"
        );
        factory.trip = trip;
    }
    return factory;
})