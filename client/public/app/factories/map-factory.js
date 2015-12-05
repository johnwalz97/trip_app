angular.module("TripApp").factory("mapFactory", function(){
    factory = {};
    factory.position;
    if (navigator.geolocation) {    
        function success(pos){
            factory.position = pos.coords;
        }
        navigator.geolocation.getCurrentPosition(success);
    } else {
        alert('Geolocation is not supported in your browser');
    }
    return factory;
})