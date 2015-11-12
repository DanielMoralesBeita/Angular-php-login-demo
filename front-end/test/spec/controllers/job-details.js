'use strict';

describe('Controller: JobDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('343LandingPageApp'));

  var JobDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    JobDetailsCtrl = $controller('JobDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach the scope for the JobDetailsCtrl', function () {
    expect(scope.title).toBe('jobdetails');
  });

  

});