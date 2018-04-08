angular.module('Craiglist', ['ngRoute'])
	.config( ['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', {
                templateUrl: 'main.html',
			})
			.when('/dashboard', {
                templateUrl: 'dashboard.html',
                controller: 'DashboardCtrl'
			})
			.otherwise({
				redirectTo: '/'
			});
    }])
    .controller('DashboardCtrl',function($scope, $http){
        console.log("Dashboard Controller");

        userLogin=function(){
            console.log("Login Fucntion");
        };
        userRegister = function(){
            console.log("User Register");
        };
    })
    .controller('MainCtrl', function($scope, $window, $http){
        console.log("Main Controller");
    });