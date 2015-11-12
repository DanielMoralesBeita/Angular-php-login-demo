'use strict';

describe('Controller: TrabajosCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var TrabajosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrabajosCtrl = $controller('TrabajosCtrl', {
      $scope: scope
    });
  }));

  it('should attach the scope for the TrabajosCtrl', function () {
    expect(scope.title).toBe('trabajos');
  });

  

});