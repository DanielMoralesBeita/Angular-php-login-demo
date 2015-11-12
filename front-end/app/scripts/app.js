'use strict';

/**
 * @ngdoc overview
 * @name 343LandingPageApp
 * @description
 * # 343LandingPageApp
 *
 * Main module of the application. 
    'mockApp'
 */
angular
    .module('343LandingPageApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
    .config(function ($routeProvider) {

        function loginRequired($q, $location, authFact) {
            var deffered = $q.defer();
            if (authFact.isUserAuthenticated()) {
                deffered.resolve();
            } else {
                $location.path('/account/login');
            }

            return deffered.promise;
        }
    

        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .when('/detalles', {
                templateUrl: 'views/detalles.html',
                controller: 'DetallesCtrl'
            })
            .when('/precios', {
                templateUrl: 'views/precios.html',
                controller: 'PreciosCtrl'
            })
            .when('/account/login', {
                templateUrl: 'views/account/login.html',
                controller: 'LoginCtrl'
            })
            .when('/account/create', {
                templateUrl: 'views/account/create.html',
                controller: 'CreateCtrl'
            })
            .when('/account/new-post', {
                templateUrl: 'views/account/new-job-post.html',
                controller: 'NewjobpostCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/clasificados', {
                templateUrl: 'views/clasificados.html',
                controller: 'ClasificadosCtrl'
            })
            .when('/details/:id', {
                templateUrl: 'views/details.html',
                controller: 'DetailssCtrl'
            })
            .when('/trabajos', {
                templateUrl: 'views/trabajos.html',
                controller: 'TrabajosCtrl'
            })
            .when('/trabajos-details/:jobid/:ownerId', {
                templateUrl: 'views/trabajos-details.html',
                controller: 'JobDetailsCtrl'
            })
            .when('/for-sale/:all', {
                templateUrl: 'views/for-sale.html',
                controller: 'ForSaleCtrl'
            })
            .when('/results/:searchTerm', {
                templateUrl: 'views/results.html',
                controller: 'ResultsCtrl'
            })
            .when('/profile/:profileId', {
                templateUrl: 'views/profile.html',
                controller: 'ProfileCtrl'
            })
            .when('/lectura', {
                templateUrl: 'views/lectura.html',
                controller: 'LecturaCtrl'
            })
            .when('/anunciate', {
                templateUrl: 'views/anunciate.html',
                controller: 'AnunciateCtrl'
            })
            .when('/crear-anuncio', {
                templateUrl: 'views/crear-anuncio.html',
                controller: 'CrearanuncioCtrl'
            })
            .when('/account/dashboard', {
                templateUrl: 'views/account/dashboard.html',
                controller: 'AccountDashboardCtrl',
                resolve: {
                    loginRequired: loginRequired
                }
            })
            .when('/logout', {
                templateUrl: 'views/logout.html',
                controller: 'LogoutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .run(function ($rootScope, authFact) {
        if (authFact.isUserAuthenticated()) {
            $rootScope.isUserAuthenticated = authFact.isUserAuthenticated();
        }
    });