'use strict';

angular.module("taskService", ["ngResource"]).
       factory("Task", function ($resource) {
           return $resource(
               // "/tasks/:id",
               'http://localhost:port/api/tasks/:id',
               // '/api/tasks/:id',
               { port: ':5000', id: "@id" },
               // { id: "@id" },
               { "update": {method:"PUT"}, 'query': {method: 'GET', isArray: false} }    
          );
      });

angular
  .module('angularYeomanTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'google-maps',
    'taskService',
    'btford.socket-io'
  ])

.factory('socket', function (socketFactory) {
  return socketFactory({
    prefix: '',
    // ioSocket: io.connect('http://localhost:5000/test')
    // ioSocket: io.connect('http://intense-springs-3824.herokuapp.com:80/test')
    ioSocket: io.connect('http://yolo-avenger-backend.herokuapp.com:80/test')
  });
})




  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/myroute', {
        templateUrl: 'views/myroute.html',
        controller: 'MyrouteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
