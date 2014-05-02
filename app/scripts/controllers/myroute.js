'use strict';

angular.module('angularYeomanTestApp')
  .controller('MyrouteCtrl', function($scope, socket) {

    $scope.map = {
      center: {
        latitude: 40.728007,
        longitude: -74.076401
      },
      zoom: 12,
      draggable: true,
      refresh: true
    };

// Returns a random number between min and max
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

var MIN_LAT = 40.709337;
var MAX_LAT = 40.742510;
var MIN_LNG = -74.036793;
var MAX_LNG = -74.099707;

    var markers = [{
      latitude: 40.728007,
      longitude: -74.066401
    }, {
      latitude: 40.739107,
      longitude: -74.077401
    }, {
      latitude: 40.704207,
      longitude: -74.078401
    }, {
      latitude: 40.725007,
      longitude: -74.084401
    }]

    // $scope.markers = markers;
    $scope.markers = [];

    $scope.addMarker = function() {

      var lat = getRandomArbitrary(MIN_LAT, MAX_LAT);
      var lng = getRandomArbitrary(MIN_LNG, MAX_LNG);
      // $scope.markers.push(markers.pop());
      $scope.markers.push({latitude: lat, longitude: lng});
      console.log("Adding a marker");
    }
    $scope.removeMarker = function() {
      var marker = $scope.markers.pop();
      // $scope.markers.pop();
      console.log("Removing a marker");

      // This is needed. See here: http://stackoverflow.com/questions/14940159/angularui-google-maps-remove-marker
      // angular.forEach($scope.markers, function(marker) {
      //   marker.setMap(null);
      // });
      // marker.setMap(null);
    }

    $scope.connectToBackend = function() {
      $scope.stuffs = [];
      socket.on('my response', function(data) {
        // $scope.bar = true;
        console.log(data.count);
        $scope.data = data;
        $scope.stuffs.push(data);

        $scope.markers.push(data.coords);
        // socket.emit("Tom");
      });

      // socket.on('connect', function() {
      //   socket.emit('my event', {
      //     data: 'I\'m connected!'
      //   });
      // });
    }

    $scope.disconnectFromBackend = function() {
      // socket.emit('disconnect');
      socket.removeAllListeners('my response');
      // socket.disconnect();
    }
  });
