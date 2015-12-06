'use strict';

describe('NewjobpostCtrl', function() {
  beforeEach(module('343LandingPageApp'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));

  describe('$scope.token', function() {
    it('should not be null', function() {
      var $scope = {};
      //var controller = $controller('NewjobpostCtrl', { $scope: $scope });
      $scope.token = '[{"token": "the token to be parsed"}]';
      expect($scope.token).not.toBeNull();
    });
  });
});