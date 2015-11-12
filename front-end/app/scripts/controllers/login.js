(function () {

    'use strict';

    /**
     * @ngdoc function
     * @name 343LandingPageApp.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the 343LandingPageApp
     */
    angular.module('343LandingPageApp')
        .controller('LoginCtrl', ['$scope', '$location', '$http', '$rootScope', 'authFact', function ($scope, $location, $http, $rootScope, authFact) {

            var user = {
                username: '',
                password: '',
            };

            $scope.login = function () {
                authFact.login($scope.user).then(function (response) {
                    // success                
                    console.log(authFact.isUserAuthenticated());
                    if (authFact.isUserAuthenticated()) {
                        
                        $rootScope.isUserAuthenticated = authFact.isUserAuthenticated();
                        
                        $location.path('/account/dashboard');
                        
                    } else {
                        
                        window.alert(response.data.message);
                        
                        $scope.user.username = '';
                        $scope.user.password = '';
                    }
                }, function (response) {
                    // error
                    window.alert('error:' + response.data.message);
                });
            };


	}]);

}());