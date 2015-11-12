'use strict';

describe('Controller: NewjobpostCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var NewjobpostCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewjobpostCtrl = $controller('NewjobpostCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
