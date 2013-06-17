'use strict';

angular.module('geoAngularApp').controller('MainCtrl',
  ['$scope','lenguagesSwitch', function ($scope,lenguagesSwitch){
    //set english as default language
    $scope.countryCode = "US";//use ISO 3166-1-alpha-2 code
    //call the service function and send the contry code as a parameter
    //to load the correct json. 
    lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){    
      //fill the $scope object the json data(languages)        
      $scope.languagesJSON = data[$scope.countryCode];            
    });
    //model dropdown languages menu.
    $scope.pageLanguages = [
      "Español",
      "English",
      "Italiano",
      "Deutsch",
      "French"
    ];
    //this function change the language reciving a parameter from dropdown languages menu.
    //ng-click(language)
    $scope.changeLang = function(lenguage){
      //evaluate what is the parameter value.
      if(lenguage === 'Español'){
        $scope.countryCode = "ES";
        lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){            
          $scope.languagesJSON = data[$scope.countryCode];            
        }); 
      }else if(lenguage === 'English'){
        $scope.countryCode = "US";
        lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){            
          $scope.languagesJSON = data[$scope.countryCode];            
        }); 
      }else if(lenguage === 'Italiano'){
        $scope.countryCode = "IT";
        lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){            
          $scope.languagesJSON = data[$scope.countryCode];            
        }); 
      }else if(lenguage === 'Deutsch'){
        $scope.countryCode = "DE";
        lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){            
          $scope.languagesJSON = data[$scope.countryCode];            
        }); 
      }else if(lenguage === 'French'){
        $scope.countryCode = "FR";
        lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){            
          $scope.languagesJSON = data[$scope.countryCode];            
        }); 
      }
    }
    //ask if the navigator has Geolocations
    if(navigator.geolocation) {
    //this method get the user's position and return an object
    //with the cordinates in the especified function(paramater get location)
      navigator.geolocation.getCurrentPosition(getLocation);
    }else{
      $scope.valuei18n = 'Geolocation is not supported by this browser.';
    }
    //this function get the user's location, recive the cords as a parameter.
    function getLocation(position){
      //get the lat and long from position obj.
      var lat = position.coords.latitude 
         ,lng = position.coords.longitude 
         ,mapResults = []//create an empty obj, will be fill up by the google map json obj.
         ,latlng = new google.maps.LatLng(lat,lng);//get the lat and long.
      $scope.geocoder = new google.maps.Geocoder();// instantiate a new google map object.
      //send the lat and long to get the location info in a obj. 
      $scope.geocoder.geocode( {'latLng':latlng}, function(results, status){        
        if(status == google.maps.GeocoderStatus.OK){
          mapResults = results[1].address_components;//fill the obj with the callback results
          //get the al the object parameter "short_name" 
          //and them get the last one that have the country code with lo-Dash.
          $scope.countryCode = _.last(_.pluck(mapResults, 'short_name'));
          lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){            
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



  

