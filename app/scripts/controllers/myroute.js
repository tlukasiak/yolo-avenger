'use strict';

angular.module('angularYeomanTestApp')
  .controller('MyrouteCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

$scope.map = {
    center: {
        latitude: 40.728007,
        longitude: -74.076401
    },
    zoom: 12,
    draggable: "true"
};
  });