'use strict';

describe('Controller: CrearanuncioCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var CrearanuncioCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CrearanuncioCtrl = $controller('CrearanuncioCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
