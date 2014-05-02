'use strict';

angular.module('angularYeomanTestApp')
  .controller('MainCtrl', function ($scope, Task, socket) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.tasks = Task.query();
    window.tasks = $scope.tasks;


    $scope.stuffs = [];
  socket.on('my response', function (data) {
    // $scope.bar = true;
    console.log(data.count);
    $scope.data = data;
           $scope.stuffs.push(data);

  // socket.emit("Tom");
  });

  socket.on('connect', function() {
      socket.emit('my event', {data: 'I\'m connected!'});
  });
  // $scope.$log = $log;
  // $scope.message = 'Hello World!';    



  });
