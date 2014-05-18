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


    var last = function(timeFrame) {
      var deferred = $q.defer();
      // Get list of open angular js pull requests from github
      $http({
        method: 'GET',
        // url: 'https://data.openjerseycity.org/api/action/datastore_search_sql?sql=SELECT%20*%20from%20%229accc92a-c800-4495-8173-650235dd20f1%22%20WHERE%20timestamp%20%3E=%20%272013-12-01T00:00:00%27::TIMESTAMP%20-%20%271%20hour%27::INTERVAL',
        // url: encodeURI('https://data.openjerseycity.org/api/action/datastore_search_sql?sql=SELECT * from "9accc92a-c800-4495-8173-650235dd20f1" WHERE timestamp >= \'2013-12-01T00:00:00\'::TIMESTAMP - \''+timeFrame+'\'::INTERVAL'),
        url: encodeURI('https://data.openjerseycity.org/api/action/datastore_search_sql?sql=SELECT latitude, longitude from "9accc92a-c800-4495-8173-650235dd20f1" WHERE timestamp >= \'2013-12-01T00:00:00\'::TIMESTAMP - \''+timeFrame+'\'::INTERVAL'),
      })
        .success(function(data) {
          console.log("resolving " + data);
          // console.log(data.result.total);
          deferred.resolve(data.result.records);
        })
        .error(function(reason) {
          console.log("error " + reason);
          deferred.reject(reason);
        })
      return deferred.promise;
    }

    var lastHour = function() {
      return last('1 hour')
    }

    var lastDay = function() {
      return last('1 day')
    }

    var lastWeek = function() {
      return last('1 week')
    }

    var lastMonth = function() {
      return last('1 month')
    }




    // var total = function () {
    //   $log.log("total() " + totalItems);
    //   return $q.when(totalItems);
    // }

    return {
      get: get,
      total: total,
      getTimePeriod: last,
      lastHour: lastHour,
      lastDay: lastDay,
      lastWeek: lastWeek,
      lastMonth: lastMonth,
    };
  }
)
