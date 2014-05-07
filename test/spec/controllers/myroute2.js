'use strict';

describe('Controller: Myroute2Ctrl', function () {

  // load the controller's module
  beforeEach(module('angularYeomanTestApp'));

  var Myroute2Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Myroute2Ctrl = $controller('Myroute2Ctrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
