'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:TrabajosCtrl
 * @description
 * # TrabajosCtrl
 * Controller of the 343LandingPageApp
 */
 (function(){

	angular.module('343LandingPageApp')
	  .controller('TrabajosCtrl', ['$scope', '$http', function ($scope, $http) {
          
        $('#spinner').removeClass('hide');
          
	    $scope.title = 'trabajos';

        // api/all-trabajos
	    $http.get('http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/trucking/jobs')
	    .success(function(data){
	    	$scope.clasificados = data;
            $('#spinner').addClass('hide');
	    });
	   
	}]);

 }());