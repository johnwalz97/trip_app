angular.module("TripApp").factory('loginFactory', function(){
    var factory = {};
    factory.register = function(data, callback) {
        $.post(
            '/users/create',
            data,
            function(response){callback(response)},
            "json"
        );
    };
    factory.signin = function(data, callback) {
        $.post(
            '/users/user',
            data,
            function(response){callback(response)},
            "json"
        );
    };
    return factory;
})