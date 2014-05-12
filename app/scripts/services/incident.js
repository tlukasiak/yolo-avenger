'use strict';

// look for a Promise explanation here: http://jsbin.com/UfotanA/3/edit

angular.module('yoloAvenger')
.factory('Incident',
  function($q, $http, $log) {

    var totalItems = 0;
    var get = function(offset, limit) {
      var deferred = $q.defer();
      // Get list of open angular js pull requests from github
      $http({
        method: 'GET',
        url: 'https://data.openjerseycity.org/api/action/datastore_search?resource_id=9accc92a-c800-4495-8173-650235dd20f1',
        params: {
          offset: offset,
          limit: limit
        }
      })
        .success(function(data) {
          console.log("resolving " + data);
          console.log(data.result.total);
          deferred.resolve(data.result.records);
          totalItems = data.result.total;
        })
        .error(function(reason) {
          console.log("error " + reason);
          deferred.reject(reason);
        })
      return deferred.promise;
    }

    var total = function() {
      var deferred = $q.defer();
      // Get list of open angular js pull requests from github
      $http({
        method: 'GET',
        url: 'https://data.openjerseycity.org/api/action/datastore_search?resource_id=9accc92a-c800-4495-8173-650235dd20f1',
        params: {
          offset: 10,
          limit: 10
        }
      })
        .success(function(data) {
          console.log("resolving " + data);
          console.log(data.result.total);
          deferred.resolve(data.result.total);
        })
        .error(function(reason) {
          console.log("error " + reason);
          deferred.reject(reason);
        })
      return deferred.promise;
    }

    // var total = function () {
    //   $log.log("total() " + totalItems);
    //   return $q.when(totalItems);
    // }

    return {
      get: get,
      total: total
    };
  }
)
