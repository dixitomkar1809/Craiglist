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
    .controller('DashboardCtrl',function($scope){
        console.log("Dashboard Controller");
    })
    .controller('MainCtrl', function($scope, $window){
        console.log("Main Controller");
    });