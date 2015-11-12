(function(){

	'use strict';

	/**
	 * @ngdoc function
	 * @name 343LandingPageApp.controller:NewjobpostCtrl
	 * @description
	 * # NewjobpostCtrl
	 * Controller of the 343LandingPageApp
	 */
	angular.module('343LandingPageApp')
	  .controller('NewjobpostCtrl', ['$scope', '$http', 'authFact', function ($scope, $http, authFact) {
	    
        var token = JSON.parse(authFact.getToken()).token;
	    // init the datab model
	    $scope.job = {
	    	title: '',
	    	description:'',
	    	requirements:'',
	    	location:'',
	    	compensation:'',
	    	benefits:'',
	    	howToApply:'',
            token: token
	    };

	    
	    var req = {
			method: 'POST',
			url: 'http://localhost:62774/api/v1/trucking/job',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: $scope.job
		};
          
	    $scope.save = function(){
	    	
	    	$http(req)
		    .then(function(response){
		    	// success
		    	window.alert(response.data.message);
                
                // clear input fields
                $scope.clearInputFields();
                
		    }, function(response){
		    	// error
		    	window.alert(response.status+' '+ response.statusText + ' error');
                $scope.errorMessages = response.data;
		    });
			
	    }; 
          
          $scope.clearInputFields = function(){
            $scope.job = null;
          };

	  }]);

}());