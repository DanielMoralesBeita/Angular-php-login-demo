/**
* @ngdoc function
* @name 343LandingPageApp.controller:IncludesHeaderCtrl
* @description
* # IncludesHeaderCtrl
* Controller of the 343LandingPageApp
*/
(function () {

    'use strict';
    
    angular.module('343LandingPageApp')
    .controller('IncludesHeaderCtrl', function ($rootScope, authFact) {

        $rootScope.isUserAuthenticated = authFact.isUserAuthenticated();

    });

} ());