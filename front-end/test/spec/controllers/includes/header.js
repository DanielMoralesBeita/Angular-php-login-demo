'use strict';

describe('Controller: IncludesHeaderCtrl', function () {

    // load the controller's module
    beforeEach(module('343LandingPageApp'));

    var IncludesHeaderCtrl,
    scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        IncludesHeaderCtrl = $controller('IncludesHeaderCtrl', {
            $scope: scope
        });
    }));

    it('should not be NULL', function () {
        expect(scope).not.toBeNull();
    });
});
