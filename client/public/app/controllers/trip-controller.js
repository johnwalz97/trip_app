//new trip controller
angular.module("TripApp").controller("newTripController", function(loginFactory, tripFactory, $scope, $location){
    tripFactory.getTrips(function(trips){
        $scope.trips = trips;
        $scope.$apply();
    });
    $scope.trip = {};
    var autocomplete_start = new google.maps.places.Autocomplete(document.getElementById("start"));
    var autocomplete_end = new google.maps.places.Autocomplete(document.getElementById("end"));
    $scope.validate = function(){
        if (true) {
            console.log(loginFactory.user._id)
            if (loginFactory.user._id) {
                tripFactory.saveTrip($scope.trip, loginFactory.user._id);
                $location.path("/map")
            } else {
                alert("Please login or register to save your trip before you close yoour browser!")   
            }
        }
    }
    $scope.old_trip = function(trip){
        tripFactory.trip = trip;
        $location.path("/map");
    }
})