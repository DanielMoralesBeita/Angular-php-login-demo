'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the 343LandingPageApp
 */
angular.module('343LandingPageApp')
    .controller('LogoutCtrl', ['$scope', '$location', '$rootScope', 'authFact', function ($scope, $location, $rootScope, authFact) {
        
        if (!authFact.isUserAuthenticated()) {
            return;
        }
        
        authFact.logout().then(function (response) {
            
            $scope.message = response.data.message;
            $rootScope.isUserAuthenticated = false;
            
        }, function (error) {
            // error
            $rootScope.isUserAuthenticated = false;
        });
        
    }]);