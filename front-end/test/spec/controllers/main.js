'use strict';

describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('343LandingPageApp'));

    var MainCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    it('MainCtrl should not be null.', function () {

       // expect(MainCtrl).not.toBe(null);
       expect(scope.test).toBe('MainCtrl');
    });
});
