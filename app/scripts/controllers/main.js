'use strict';

angular.module('yoloAvenger')
  .controller("MainCtrl", function($scope, $log, Incident) {

// http://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};

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
      var data2 = [];
      angular.forEach(data, function(value, key){
        value.latitude = value.latitude.toFixedDown(2);
        value.longitude = value.longitude.toFixedDown(2);
        value.longitude = -value.longitude; // HACK the toFixedDown funcion does not work on negative numbers

        data2.push(value);
     });

        $scope.pagedItems = data2;
        // $log.log("table.js got: " + $scope.pagedItems);

        $scope.markers = data2;
        // $log.log(data2)
        // $log.log($scope.markers);
      });
    });

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };


  })
