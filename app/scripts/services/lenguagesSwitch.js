'use strict';

angular.module('geoAngularApp')
  .factory('lenguagesSwitch', ['$http','$q',function($http,$q){
    return{
      getLenguages : function(){
        var deferred = $q.defer();
        $http.get('scripts/lenguages/lenguages.json').success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    };
}]);

