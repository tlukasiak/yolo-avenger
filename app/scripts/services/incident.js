'use strict';

angular.module('angularYeomanTestApp')
  .factory("Incident", function() {

    var items = [];
    for (var i = 0; i < 50; i++) {
      items.push({
        id: i,
        name: "name " + i,
        description: "description " + i
      });
    }

    return {
      get: function(offset, limit) {
        return items.slice(offset, offset + limit);
      },
      total: function() {
        return items.length;
      }
    };
  });
