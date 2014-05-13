"use strict";angular.module("yoloAvenger",["ngCookies","ngResource","ngSanitize","ngRoute","google-maps","btford.socket-io","ui.bootstrap"]).factory("socket",["socketFactory",function(a){return a({prefix:"",ioSocket:io.connect("http://yolo-avenger-backend.herokuapp.com:80/test")})}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/map",{templateUrl:"views/map.html",controller:"MapCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/contact",{templateUrl:"views/contact.html",controller:"ContactCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("yoloAvenger").controller("MainCtrl",["$scope","$log","Incident",function(a,b,c){function d(a,b){var c=a.toString(),d=c.indexOf("."),e=-1==d?c.length:1+d+b,f=c.substr(0,e),g=isNaN(f)?0:f;return parseFloat(g)}a.radioModel="12 hours";a.map={center:{latitude:40.728007,longitude:-74.076401},zoom:12,draggable:!0,refresh:!0},a.markers=[],a.maxSize=10,a.totalItems=c.total(),c.total().then(function(b){a.totalItems=b}),a.currentPage=1,a.itemsPerPage=10,a.$watch("currentPage",function(e){b.log("table.js requesting"),c.get(e*a.itemsPerPage,a.itemsPerPage).then(function(b){var c=[];angular.forEach(b,function(a){a.latitude=d(a.latitude,3),a.longitude=d(a.longitude,3),c.push(a)}),a.pagedItems=c})}),a.pageChanged=function(){console.log("Page changed to: "+a.currentPage)},a.recentIncidents=[],a.$watch("radioModel",function(){console.log("hey, radioModel has changed!"),c.getTimePeriod(a.radioModel).then(function(b){a.recentIncidents=b,a.markers=b})})}]),angular.module("yoloAvenger").controller("MapCtrl",["$scope","$http","socket",function(a,b,c){function d(a,b){return Math.random()*(b-a)+a}var e=40.709337,f=40.74251,g=-74.036793,h=-74.099707;a.map={center:{latitude:40.728007,longitude:-74.076401},zoom:12,draggable:!0,refresh:!0},a.markers=[],a.addMarker=function(){var b=d(e,f),c=d(g,h);a.markers.push({latitude:b,longitude:c}),console.log("Adding a marker")},a.removeMarker=function(){a.markers.pop();console.log("Removing a marker")},a.connectToBackend=function(){a.stuffs=[],c.on("my response",function(b){console.log(b.count),a.data=b,a.stuffs.push(b),a.markers.push(b.coords)})},a.disconnectFromBackend=function(){c.removeAllListeners("my response")};b.get("404.html").success(function(b){a.data=b,console.log(b)}).error(function(){throw new Error("Something went wrong...")})}]),angular.module("yoloAvenger").controller("UserCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("yoloAvenger").directive("myDirective",function(){return{template:"<div></div>",restrict:"E",link:function(a,b){b.text("this is the myDirective directive")}}}),angular.module("yoloAvenger").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("yoloAvenger").controller("ContactCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("yoloAvenger").factory("Incident",["$q","$http","$log",function(a,b){var c=0,d=function(d,e){var f=a.defer();return b({method:"GET",url:"https://162.243.24.143/api/action/datastore_search?resource_id=9accc92a-c800-4495-8173-650235dd20f1",params:{offset:d,limit:e}}).success(function(a){console.log("resolving "+a),console.log(a.result.total),f.resolve(a.result.records),c=a.result.total}).error(function(a){console.log("error "+a),f.reject(a)}),f.promise},e=function(){var c=a.defer();return b({method:"GET",url:"https://162.243.24.143/api/action/datastore_search?resource_id=9accc92a-c800-4495-8173-650235dd20f1",params:{offset:10,limit:10}}).success(function(a){console.log("resolving "+a),console.log(a.result.total),c.resolve(a.result.total)}).error(function(a){console.log("error "+a),c.reject(a)}),c.promise},f=function(c){var d=a.defer();return b({method:"GET",url:encodeURI("https://162.243.24.143/api/action/datastore_search_sql?sql=SELECT * from \"9accc92a-c800-4495-8173-650235dd20f1\" WHERE timestamp >= '2013-12-01T00:00:00'::TIMESTAMP - '"+c+"'::INTERVAL")}).success(function(a){console.log("resolving "+a),d.resolve(a.result.records)}).error(function(a){console.log("error "+a),d.reject(a)}),d.promise},g=function(){return f("1 hour")},h=function(){return f("1 day")},i=function(){return f("1 week")},j=function(){return f("1 month")};return{get:d,total:e,getTimePeriod:f,lastHour:g,lastDay:h,lastWeek:i,lastMonth:j}}]),angular.module("yoloAvenger").factory("Task",["$resource",function(a){return a("http://localhost:port/api/tasks/:id",{port:":5000",id:"@id"},{update:{method:"PUT"},query:{method:"GET",isArray:!1}})}]);