'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:ResultsCtrl
 * @description
 * # ResultsCtrl
 * Controller of the 343LandingPageApp
 */
(function () {

    angular.module('343LandingPageApp')
        .controller('ResultsCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
            
            $scope.title = 'results';
            $scope.message = '';

            // do the call to the http
            var url = 'http://localhost:62774/api/v1/trucking/searchJobs?searchTerm=';
            var searchTerm = $routeParams.searchTerm;
            
            $http.get(url + searchTerm)
                .then(function (response) {
                    // success
                    
                    $scope.searchResults = response.data;
                
                }, function(error){
            
                    // failure
                    $scope.message = 'Unable to find your matches. Please try again!';
            });

	}]);

}());