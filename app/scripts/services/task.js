'use strict';

angular.module('yoloAvenger')
  .factory("Task", function($resource) {
    return $resource(
      // "/tasks/:id",
      'http://localhost:port/api/tasks/:id',
      // '/api/tasks/:id',
      {
        port: ':5000',
        id: "@id"
      },
      // { id: "@id" },
      {
        "update": {
          method: "PUT"
        },
        'query': {
          method: 'GET',
          isArray: false
        }
      }
    );
  });
