'use strict';

angular.module('storeApp')
  .controller('MainCtrl', function ($scope, $http, socket,$stateParams) {
    $scope.store = [];


  /*
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });
  */
     $http.get('/api/stores').success(function(stores) {
      $scope.stores = stores;
      console.log('stores '+stores);
      socket.syncUpdates('store', $scope.stores);
      
    });


    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  })


.controller('StoreCtrl', function ($scope, $http, socket,$stateParams) {
 $scope.store = null;
    $scope.products = [];
    console.log('param '+$stateParams.storeId )


    $http.get('/api/stores/'+$stateParams.storeId).success(function(store) {
      $scope.store = store;
      console.log('store '+store);

      //socket.syncUpdates('store', $scope.stores);
    });


    $http.get('/api/products').success(function(prs) {
      $scope.products = prs;
      console.log('prs '+prs);
      socket.syncUpdates('product', $scope.products );
      //socket.syncUpdates('store', $scope.stores);
    });



  })




  ;
