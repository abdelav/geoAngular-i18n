'use strict';

angular.module('geoAngularApp')
  .factory('lenguagesSwitch', ['$http','$q',function($http,$q){
    return{
      //this function load the correct jason usin the country code.
      getLanguages : function(lang){
        var deferred = $q.defer();
        $http.get('scripts/i18n/lang_'+lang+'.json').success(function(data){
          deferred.resolve(data);
        }).error(function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    };
}]);

