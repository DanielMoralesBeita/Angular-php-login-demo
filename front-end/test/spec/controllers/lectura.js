'use strict';

describe('Controller: LecturaCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var LecturaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LecturaCtrl = $controller('LecturaCtrl', {
      $scope: scope
    });
  }));

  it('should attach the scope for the LecturaCtrl', function () {
    expect(scope.test).toBe('LecturaCtrl');
  });

});