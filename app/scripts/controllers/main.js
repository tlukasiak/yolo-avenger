'use strict';

angular.module('angularYeomanTestApp')
  .controller('MainCtrl', function($scope, Task, socket, $log, Incident) {

    $scope.tasks = Task.query();
    window.tasks = $scope.tasks;

    $scope.stuffs = [];

    function init (argument) {
      // body...
    socket.on('my response', function(data) {
      // $scope.bar = true;
      console.log(data.count);
      $scope.data = data;
      $scope.stuffs.push(data);

      // socket.emit("Tom");
    });

    socket.on('connect', function() {
      socket.emit('my event', {
        data: 'I\'m connected!'
      });
    });
    // $scope.$log = $log;
    // $scope.message = 'Hello World!';    
    }

    $scope.connectToBackend = function() {
      socket.on('my response', function(data) {
        // $scope.bar = true;
        console.log(data.count);
        $scope.data = data;
        $scope.stuffs.push(data);

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
