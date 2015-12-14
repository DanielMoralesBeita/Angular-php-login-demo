'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:AccountDashboardCtrl
 * @description
 * # AccountDashboardCtrl
 * Controller of the 343LandingPageApp
 */
angular.module('343LandingPageApp')
    .controller('AccountDashboardCtrl', ['$scope', '$http', 'authFact', '$location', function ($scope, $http, authFact, $location) {
        var test = 'test';
        var token = JSON.parse(authFact.getToken()).token;
        var url = 'http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/account/dashboard';

        $scope.loadData = function () {

            $http.get(url + '?token=' + token).then(function (response) {

                // success
                if(response.data.status !== 'fail'){
                    $scope.posts = response.data;
                }

            }, function (response) {
                $location.path('/logout');
            });
        }

        /**
        * @description
        * Removes the post from the users profile
        */       
        $scope.removePost = function (postId) {            
            
            if (window.confirm("Are you sure you want to delete this?")) {
                var data = {
                    'token': token
                };

                $http.delete('http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/trucking/job/' + postId + '?token=' + token, {token:token}).then(function (response) {

                    // success: load data again to refresh the page
                    $scope.loadData();

                }, function (error) {
                    // error
                    console.log(error.data);
                });
            }
        };
        

        /**
         * @name editJob
         * @description
         * Edits the job details for this job
         * @param {Integer} id
         */
        $scope.loadForm = function (mypost) {            
            $scope.jobObject = {
                id: mypost.id,
               title : mypost.title,
               description: mypost.description,
               requirements: mypost.requirements,
               location: mypost.location,
               compensation: mypost.compensation,
               benefits: mypost.benefits,
               howToApply: mypost.howToApply,
               datePosted: mypost.datePosted
            };
        }

        $scope.update = function(mypost){
            $scope.jobObject = {
               id: mypost.id,
               title : mypost.title,
               description: mypost.description,
               requirements: mypost.requirements,
               location: mypost.location,
               compensation: mypost.compensation,
               benefits: mypost.benefits,
               howToApply: mypost.howToApply,
               datePosted: mypost.datePosted
            };

            var urlRequest = 'http://neadcom.wwwss24.a2hosted.com/343TruckingAPI/api/v1/trucking/job/update?token=' + token;

            var req = {
			    method: 'POST',
			    url: urlRequest,
			    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			    data: $scope.jobObject
		    };

            // send the request to post
            $http(req).then(function(response){
                alert('Succes');
                $scope.loadData();
            }, function(error){
                alert('Failure')
            });
        }

        if (authFact.isUserAuthenticated()) {
            $scope.loadData();
        }
}]);