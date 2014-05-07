'use strict';

angular
  .module('angularYeomanTestApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'google-maps',
    'btford.socket-io',
    'ui.bootstrap'
  ])

.factory('socket', function(socketFactory) {
  return socketFactory({
    prefix: '',
    // ioSocket: io.connect('http://localhost:5000/test')
    // ioSocket: io.connect('http://intense-springs-3824.herokuapp.com:80/test')
    ioSocket: io.connect('http://yolo-avenger-backend.herokuapp.com:80/test')
  });
})




.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/map', {
      templateUrl: 'views/map.html',
      controller: 'MapCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactCtrl'
    })
    .when('/table', {
      templateUrl: 'views/table.html',
      controller: 'TableCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
