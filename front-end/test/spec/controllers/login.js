'use strict';

describe('Controller: LoginCtrl', function () {

    // load the controller's module
    beforeEach(module('343LandingPageApp'));

    var LoginCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        LoginCtrl = $controller('LoginCtrl', {
            $scope: scope
        });
    }));

    it('should attach the scope for the LoginCtrl', function () {
        expect(scope).not.toBeNull();
    });
});