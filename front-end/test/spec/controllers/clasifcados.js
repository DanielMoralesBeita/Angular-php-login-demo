'use strict';

describe('Controller: ClasificadosCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var ClasificadosCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ClasificadosCtrl = $controller('ClasificadosCtrl', {
      $scope: scope
    });
  }));

  it('should attach the scope for the ClasificadosCtrl', function () {
    expect(scope.title).toBe('clasificados');
  });

  

});