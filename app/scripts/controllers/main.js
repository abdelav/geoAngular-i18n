'use strict';

angular.module('geoAngularApp').controller('MainCtrl',
  ['$scope','lenguagesSwitch', function ($scope,lenguagesSwitch){
    $scope.countryCode = "US";
    lenguagesSwitch.getLenguages($scope.countryCode).then(function(data){            
      $scope.languagesJSON = data[$scope.countryCode];            
    });
    //ask if the navigator has Geolocations
    if(navigator.geolocation) {
    //this method get the user's position and return an object
    //with the cordinates in the especified funtion(paramater get location)
      navigator.geolocation.getCurrentPosition(getLocation);
    }else{
      $scope.valuei18n = 'Geolocation is not supported by this browser.';
    }
    function getLocation(position){
      var lat = position.coords.latitude 
         ,lng = position.coords.longitude 
         ,mapResults = []
         ,latlng = new google.maps.LatLng(lat,lng);
      $scope.geocoder = new google.maps.Geocoder();  
      $scope.geocoder.geocode( {'latLng':latlng}, function(results, status){        
        if (status == google.maps.GeocoderStatus.OK) {
          mapResults = results[1].address_components;
          $scope.countryCode = _.last(_.pluck(mapResults, 'short_name'));
          
          lenguagesSwitch.getLenguages($scope.countryCode).then(function(data){            
            $scope.languagesJSON = data[$scope.countryCode];     
          });
        }else{
          $scope.status = "Geocode was not successful: " + status;
        }
        $scope.$apply();
      }); 
    }; 
  }
]);



  

