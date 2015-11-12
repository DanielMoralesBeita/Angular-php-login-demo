'use strict';

/**
 * @ngdoc function
 * @name 343LandingPageApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the 343LandingPageApp
 */
angular.module('343LandingPageApp')
    .controller('CreateCtrl', ['$scope', '$location', '$rootScope', 'authFact', function ($scope, $location, $rootScope, authFact) {
        $scope.title = 'New Account';

        // init empty signUp object.    
        $scope.newUser = {
            username: '',
            password: '',
            confirmPassword: '',
            email: ''
        };

        $scope.signUp = function () {
            
            $('#spinner').removeClass('hide');
            
            authFact.register($scope.newUser).then(function (response) {
                // we have success
                
                // send the user to his new dashboard account
                if(response.data.status === 'OK'){
                    
                    $scope.emailConfirmation = response.data.email;
                    
                    $('.el-contenedor h3').addClass('hide');    
                    $('.la-forma-contenedor').addClass('hide');
                    $('#message-success').removeClass('hide');
                    
                    $('#spinner').addClass('hide');
                }

            }, function (response) {
                // we have an error
                //console.log(response.data.message);
                window.alert('error: ' + response.data.message);
                
                // hide sppiner
                $('#spinner').addClass('hide');

            });
        }
        
    }]);