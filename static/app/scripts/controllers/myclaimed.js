'use strict';

angular.module('declutterApp')
  
  .filter('availbool', function(){
        return function(boolValue) {
            if (boolValue === true)
                return "Claimed";
            else
                return "Available";
        };
    })

  .controller('MyclaimedCtrl', function ($scope, $http, $cookies) {
    $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;


    var items_request = $http.get('/api/items/claimer');
    items_request.success(function(data){
        console.log("success" + data);
        $scope.items=data;
    });
    items_request.error(function(data){
        $scope.error = ["Error with items"];
        console.log("error" + data);
    });

    $scope.getTotalItems = function(){
        return $scope.items ? $scope.items.length : 0;
    };


  });
