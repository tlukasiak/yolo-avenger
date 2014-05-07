'use strict';

angular.module('angularYeomanTestApp')
.controller("TableCtrl", function($scope, Incident) {

  $scope.maxSize = 5;
  $scope.totalItems = Incident.total();
  $scope.currentPage = 1;

  $scope.itemsPerPage = 8;


  $scope.$watch("currentPage", function(newValue, oldValue) {
    $scope.pagedItems = Incident.get(newValue*$scope.itemsPerPage, $scope.itemsPerPage);
    $scope.total = Incident.total();
  });

  $scope.pageChanged = function() {
    console.log('Page changed to: ' + $scope.currentPage);
  };

});
