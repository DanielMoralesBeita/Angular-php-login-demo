'use strict';

describe('Controller: PreciosCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var PreciosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PreciosCtrl = $controller('PreciosCtrl', {
      $scope: scope
    });
  }));

  it('should attach the scope and scope.title should be equals to precios', function () {
    expect(scope.title).toBe('precios');
  });
});