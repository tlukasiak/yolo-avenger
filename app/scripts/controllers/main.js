'use strict';

angular.module('yoloAvenger')
  .controller("MainCtrl", function($scope, $log, Incident) {

// http://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript
// Number.prototype.toFixedDown = function(digits) {
//     var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
//         m = this.toString().match(re);
//     return m ? parseFloat(m[1]) : this.valueOf();
// };

// http://stackoverflow.com/questions/4912788/truncate-not-round-off-decimal-numbers-in-javascript/9232092#9232092
function truncateDecimals(num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
}


  $scope.radioModel = '12 hours';

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
        // value.latitude = value.latitude.toFixedDown(3);
        // value.longitude = value.longitude.toFixedDown(3);
        // value.longitude = -value.longitude; // HACK the toFixedDown funcion does not work on negative numbers
        value.latitude = truncateDecimals(value.latitude, 3);
        value.longitude = truncateDecimals(value.longitude, 3);

        data2.push(value);
     });

        $scope.pagedItems = data2;
        // $log.log("table.js got: " + $scope.pagedItems);

      });
    });

    $scope.pageChanged = function() {
      console.log('Page changed to: ' + $scope.currentPage);
    };

$scope.recentIncidents = [];


   $scope.$watch('radioModel', function() {
       console.log('hey, radioModel has changed!');
// debugger;
Incident.getTimePeriod($scope.radioModel).then(function(data) {
  // $log.log("recent " + data)
  $scope.recentIncidents = data;
        $scope.markers = data;
});

   });
  })
