'use strict';

describe('Controller: AccountDashboardCtrl', function () {

    // load the controller's module
    beforeEach(module('343LandingPageApp'));

    var AccountDashboardCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        AccountDashboardCtrl = $controller('AccountDashboardCtrl', {
            $scope: scope
        });
    }));

});
