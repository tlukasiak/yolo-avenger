'use strict';

angular.module('yoloAvenger')
  .controller("MainCtrl", function($scope, $log, Incident) {

  $scope.radioModel = 'day';

    // A rough rectangle delineating a geographical region of interest
    var MIN_LAT = 40.709337;
    var MAX_LAT = 40.742510;
    var MIN_LNG = -74.036793;
    var MAX_LNG = -74.099707;

    $scope.map = {
      center: {
        latitude: 40.728007,
        longitude: -74.076401
      },
      zoom: 12,
      draggable: true,
      refresh: true
    };

    $scope.markers = [];
      // $scope.markers.push({
      //   latitude: lat,
      //   longitude: lng
      // });




    $scope.maxSize = 10;
    $scope.totalItems = Incident.total();
    Incident.total().then(function(totalItems) {
      $scope.totalItems = totalItems;



    //       Incident.get(1, $scope.totalItems).then(function(data) {
    //   $log.log("all: " + $scope.pagedItems.length);
    // });



    });

    $scope.currentPage = 1;

    $scope.itemsPerPage = 10;


    $scope.$watch("currentPage", function(newValue, oldValue) {
      $log.log("table.js requesting")
      Incident.get(newValue * $scope.itemsPerPage, $scope.itemsPerPage).then(function(data) {
        $scope.pagedItems = data;
        $log.log("table.js got: " + $scope.pagedItems);
        $scope.markers = data;
      });
    });

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };


  })
