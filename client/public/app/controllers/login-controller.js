//login controller
angular.module("TripApp").controller("loginController", ['$rootScope', '$scope', '$location', 'loginFactory', function($rootScope, $scope, $location, loginFactory){
    
    //variables
    //comment
    var letters = ["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"];
    var register_flag;
    $scope.login = {};
    $scope.register = {};
    
    //login function
    $scope.submit_login = function(){
        loginFactory.signin(
            $scope.login,
            function (response) {
                if (response.type) {
                    loginFactory.user = response.data;
                    $scope.$apply(function(){
                        $location.path("/trip");
                    })
                } else {
                    $(".Lemail").removeClass("input_success").addClass("input_alert");
                    $(".Lpasswd").removeClass("input_success").addClass("input_alert");
                    $scope.login.errors = "Your email or password is incorrect!";
                }
            }
        )
    }
    
    //register function
    $scope.submit_register = function(){
        if (register_flag == false) {
            loginFactory.register(
                {
                   first:  $scope.register.name.split(" ")[0],
                   last: $scope.register.name.split(" ")[1],
                   email: $scope.register.email,
                   password: $scope.register.password
                },
                function (response) {
                    console.log(response);
                    if (response.type) {
                        loginFactory.user = response.data;
                        $scope.$apply(function(){
                            $location.path("/trip");
                        })
                    } else {
                        $scope.register.errors = response.data;
                    }
                }
            )
        }
    }
    
    
    //frontend validations
    //name
    $scope.register_name = function(){
        var first = $scope.register.name.split(" ")[0];
        var second = $scope.register.name.split(" ")[1];
        if (first.length < 3 || second.length < 3 || !/^[a-z]+$/i.test(first) || !/^[a-z]+$/i.test(second)) {
            $(".Rname").removeClass("input_success").addClass("input_alert");
            $scope.register.errors = "That is an invalid name."
            register_flag = true;
        } else {
            $(".Rname").removeClass("input_alert").addClass("input_success");
            $scope.register.errors = null;
            register_flag = false;
        }
    }
    //email
    $scope.register_email = function(){
        if (/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test($scope.register.email)) {
            $.get(
                "/users/emails/"+$scope.register.email,
                function (response) {
                    if (response.errors) {
                        $(".Remail").removeClass("input_success").addClass("input_alert");
                        register_flag = true;
                    } else if(response.email) {
                        $(".Remail").removeClass("input_success").addClass("input_alert");
                        register_flag = true;
                        $scope.register.errors = "Email already exists";
                    } else {
                        $(".Remail").removeClass("input_alert").addClass("input_success");
                        $scope.register.errors = null;
                        register_flag = false;
                    }
                }
            )
        } else {
            $(".Remail").removeClass("input_success").addClass("input_alert");
            $scope.register.errors = "That email address is not valid";
            register_flag = true;
        }
    }
    //password
    $scope.register_password = function(){
        var errors = [];
        var p = $scope.register.password;
        if (p.length < 8) {
            $(".Rpasswd").removeClass("input_success").addClass("input_alert");
            $scope.register.errors = "Your password must be at least 8 characters";
            register_flag = true;
        }
        else if (p.search(/[a-z]/i) < 0) {
            $(".Rpasswd").removeClass("input_success").addClass("input_alert");
            $scope.register.errors = "Your password must contain at least one letter.";
            register_flag = true;
        }
        else if (p.search(/[0-9]/) < 0) {
            $(".Rpasswd").removeClass("input_success").addClass("input_alert");
            $scope.register.errors = "Your password must contain at least one number.";
            register_flag = true;
        }
        else {
            $(".Rpasswd").removeClass("input_alert").addClass("input_success");
            $scope.register.errors = null;
            register_flag = false;
        }
    }
}])