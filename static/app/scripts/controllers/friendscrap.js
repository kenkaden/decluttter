/**
 * Created by skumo on 23/02/15.
 */

'use strict';

angular.module('declutterApp')
    .config(function($httpProvider , $interpolateProvider, $resourceProvider){
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //** django urls loves trailling slashes which angularjs removes by default.
    $resourceProvider.defaults.stripTrailingSlashes = false;
    })
  .controller('FriendscrapCtrl', function ($scope, $http, $cookies) {
        //  Step 1:  Get all the data from Item List API

        var poster_items = $http.get('/api/items/');
        poster_items.success(function(data){
            $scope.getObjects = true;
            $scope.arrayOfObjects = [];
            for (var i=0;  i<data.length; i++) {
                var userId = data[i]["poster"]["id"];
                var userName =  data[i]["poster"]["username"];
                var item_Name = data[i]["item_name"];
                var desc = data[i]["description"];
                var item_id = data[i]["id"];

                // Initialize with empty object and then add user & item details
                var obj = {};
                obj["poster_id"] = userId;
                obj["username"] = userName;
                obj["item"] = item_Name;
                obj["desc"] = desc;
                obj["item_id"] = item_id;
                $scope.arrayOfObjects.push(obj);


                // Step 2: Get all followers from follower list
                $scope.arrayOfFollowers = [];
                var friends = $http.get('/api/appuser/list/follower/');
                friends.success(function(data){
                    for (var i=0;  i<data.length; i++) {
                        $scope.arrayOfFollowers.push(data[i]["follower"]);
                         }
                    console.log($scope.arrayOfFollowers);
                    friends_crap($scope.arrayOfFollowers, $scope.arrayOfObjects);
                    $scope.friends=data;

                    }).
                error(function(data){
                console.log("error with friends " + data);
                    });
                    }
                    console.log("array of objects:" + $scope.arrayOfObjects);
                        $scope.poster_items = data;
                }).
                error(function(data){
                        console.log("error with poster_items " + data);
                });

        // Step 3: This function will produce resulting array of objects

        var friends_crap = function(Followers, Objects){
            $scope.resultArray = [];
//            console.log("hey you reached friends crap custom function");
//            console.log("follower:    " + Followers.length.toString());

            for (var i=0; i<Followers.length; i++) {
                for (var j = 0; j < Objects.length; j++) {
                    if (Followers[i] === Objects[j]["poster_id"]) {
                        $scope.resultArray.push(Objects[j]);
                    }
                    else {
                        console.log("no match found");
                    }
                }
            }
        console.log("resulting array is : " + $scope.resultArray[0]);
        };

        Object.toparams = function ObjecttoParams(obj) {
          var p = [];
          for (var key in obj) {
            p.push(key + '=' + encodeURIComponent(obj[key]));
          }
          return p.join('&');
        };

        $scope.claim = function(itemId){
            var url = "/api/items/update/" + itemId + "/";
            var availability = {"availability": false};
            $http.patch(url, availability).success(function(data){
                console.log("Success");
            }).
            error(function(data){
                console.log("Failure");
            });
        };





    });

