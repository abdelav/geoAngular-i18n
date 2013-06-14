'use strict';

angular.module('geoAngularApp')
  .factory('lenguagesSwitch', ['$http','$q',function($http,$q){
    return{
      getLenguages : function(lang){
        var deferred = $q.defer();
        $http.get('scripts/lenguages/lang_'+lang+'.json').success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    };
}]);

