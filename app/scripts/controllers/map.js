'use strict';

angular.module('yoloAvenger')
  .controller('MapCtrl', function($scope, $http, socket) {

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

    // Returns a random number between min and max

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    $scope.markers = [];

    $scope.addMarker = function() {

      var lat = getRandomArbitrary(MIN_LAT, MAX_LAT);
      var lng = getRandomArbitrary(MIN_LNG, MAX_LNG);
      // $scope.markers.push(markers.pop());
      $scope.markers.push({
        latitude: lat,
        longitude: lng
      });
      console.log("Adding a marker");
    }

    $scope.removeMarker = function() {
      var marker = $scope.markers.pop();
      console.log("Removing a marker");
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

    var futureResponse = $http.get('404.html')
      .success(function(data, status, headers, config) {
        $scope.data = data;
        console.log(data);
      })
      .error(function(data, status, headers, config) {
        throw new Error('Something went wrong...');
      });


  });
