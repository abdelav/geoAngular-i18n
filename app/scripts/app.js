'use strict';

angular.module('geoAngularApp', ['ui.bootstrap'])
  .config(function ($routeProvider,$httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
