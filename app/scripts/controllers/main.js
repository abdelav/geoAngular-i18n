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
      {lang:"Español", shortCode:"ES"},
      {lang:"English", shortCode:"US"},
      {lang:"Italiano", shortCode:"IT"},
      {lang:"Deutsch", shortCode:"DE"},
      {lang:"French", shortCode:"FR"}
    ];
    //this function change the language reciving a parameter from dropdown languages menu.
    //ng-click(language)
    $scope.changeLang = function(language){
      //evaluate what is the parameter value.
      $scope.countryCode = language.shortCode;
      lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){        
      $scope.languagesJSON = data[$scope.countryCode];            
    });
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
         ,mapResults = [];//create an empty obj, will be fill up by the google map json obj.
      lenguagesSwitch.getCountryCode(lat,lng).then(function(data){
        if(data.status == "OK"){
          mapResults = data.results[1].address_components;
          $scope.countryCode = _.last(_.pluck(mapResults, 'short_name'));
          lenguagesSwitch.getLanguages($scope.countryCode).then(function(data){
            $scope.languagesJSON = data[$scope.countryCode];
          });
        }else{
          $scope.status = "Geocode was not successful: " + status;  
        }
      });
    }; 
  }
]);



  

