'use strict';

angular.module('angularYeomanTestApp')
  .controller('MainCtrl', function ($scope, Task) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.tasks = Task.query();
    window.tasks = $scope.tasks;
  });
