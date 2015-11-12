'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:JobDetailsCtrl
 * @description
 * # JobDetailsCtrl
 * Controller of the 343LandingPageApp
 */
(function () {

    angular.module('343LandingPageApp')
        .controller('JobDetailsCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
            $scope.title = 'jobdetails';
            console.log('JobDetailsCtrl: ' + $routeParams.jobid);
            //   api/trabajos/1
            $http.get('http://localhost:62774/api/v1/trucking/jobs/' + $routeParams.jobid + '/' + $routeParams.ownerId)
                .success(function (data) {
                    
                    $scope.trabajo = data;
                });
	}]);

}());