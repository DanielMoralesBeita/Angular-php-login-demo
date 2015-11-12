'use strict';

describe('Controller: ForSaleCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var ForSaleCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ForSaleCtrl = $controller('ForSaleCtrl', {
      $scope: scope
    });
  }));

  it('should attach the scope for the ForSaleCtrl', function () {
    expect(scope.title).toBe('for-sale');
  });

  

});