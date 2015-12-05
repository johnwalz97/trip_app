var TripApp = angular.module('TripApp', ['ngRoute']);

//configure routes
TripApp.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: "/app/partials/home.html"
        })
        .when('/trip', {
            templateUrl: "/app/partials/new_trip.html"
        })
        .when('/map', {
            templateUrl: "/app/partials/trip.html"
        })
        .otherwise({
            redirectTo: '/'
        })
    ;
})