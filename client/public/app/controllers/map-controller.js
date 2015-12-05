//map controller
var route;
angular.module("TripApp").controller("mapController", function(tripFactory, mapFactory, $scope){
    //setting initial view and variables
    createMap({latitude: 37.09024, longitude: -100.712891}, 4);
    var autocomplete = new google.maps.places.Autocomplete(document.getElementById("add_point"));
    var markerHtml = "<div class='markerPop'><h1>Your Start Location</h1><h4>This is where your journey begins</h4></div>";
    var service = new google.maps.DirectionsService();
    var places = new google.maps.places.PlacesService(map);
    var directions = new google.maps.DirectionsRenderer();
    
    //creating users directions
    if (tripFactory.trip.travelMode == "motorcycle" || "car") {
        $scope.travelMode = google.maps.TravelMode.DRIVING;
    } else {
        $scope.travelMode = google.maps.TravelMode.BICYCLING;
    }
    directions.setMap(map);
    var request = {
        origin: tripFactory.trip.start,
        destination: tripFactory.trip.destination,
        travelMode: $scope.travelMode
    }
    service.route(request, function(result, status){
        console.log(result);
        route = result;
        points();
        directions.setDirections(result);  
    });
    
    //Getting hotels
    var counter;
    function points() {
        counter = 0;
        anon();
    }
    function anon(){
        if (counter < route.routes[0].overview_path.length-1) {
            console.log(counter)
            var request = {
                location: new google.maps.LatLng(route.routes[0].overview_path[counter].lat(), route.routes[0].overview_path[counter].lng()),
                radius: 35000,
                keyword: "hotel"
            };
            places.radarSearch(request, callback);
        }
    }
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            for (var j = 0; j < results.length && j <= 10; j++) {
                addMarker(results[j], places);
            }
        }
        counter++;
        anon();
    }
})