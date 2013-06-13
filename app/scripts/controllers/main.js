'use strict';

angular.module('geoAngularApp').controller('MainCtrl',
  ['$scope','lenguagesSwitch', function ($scope,lenguagesSwitch){
    $scope.mensaje = 'hello';
    //ask if the navigator has Geolocations
    if(navigator.geolocation) {
    //this method get the user's position and return an object
    //with the cordinates in the especified funtion(paramater get location)
      navigator.geolocation.getCurrentPosition(getLocation);
    }else{
      alert("Geolocation is not supported by this browser.");
    }
    function getLocation(position){
      var lat = position.coords.latitude 
         ,lng = position.coords.longitude
         ,mapResults = []
         ,latlng = new google.maps.LatLng(lat,lng);
      $scope.geocoder = new google.maps.Geocoder();  
      $scope.geocoder.geocode( {'latLng':latlng}, function(results, status){
        console.log(status);
        
        if (status == google.maps.GeocoderStatus.OK) {
          mapResults = results[1].address_components;
          var findShortName = _.pluck(mapResults, 'short_name');
          $scope.countryCode = _.last(findShortName);
          
          lenguagesSwitch.getLenguages().then(function(data){
            
            $scope.myData = data.spanish;
            var comparsion = _.pluck($scope.myData, 'code');
            if(_.contains(comparsion, $scope.countryCode)){
              $scope.mensaje = 'hola mop'; 
            }
          });
        }else{
          $scope.status = "Geocode was not successful: " + status;
        }
        $scope.$apply();
      }); 
    }; 
  }
]);



  

