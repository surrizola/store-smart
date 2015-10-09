'use strict';

angular.module('storeApp')
  .controller('AdminCtrl', function ($scope , $http,socket,$stateParams, Upload) {
    $scope.stores = [];
    


  $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

  $scope.addImage = function (files) {
    console.log('Images add  '+$scope.images);  
    $scope.upload($scope.images);
  }

$scope.upload = function (files) {
	console.log('upload '+files);
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: 'api/stores/upload',
                    fields: {'storeId': $scope.store._id},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                    $scope.message = ' Imaged upload OK';
                    $scope.images = null;
                    $scope.store =null;
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
            }
        }
    };


    $http.get('/api/stores').success(function(stores) {
      $scope.stores = stores;
      console.log('stores '+stores);
      socket.syncUpdates('store', $scope.stores);
      
    });

    $scope.selectStore = function(st) {
      $scope.store = st;
    };
$scope.showNewtore = function(st) {
      $scope.store = {};
    };



	$scope.saveStore = function() {
      console.log('store '+$scope.store);
      if (!$scope.store){return ;}
      if($scope.store.name === '') {return;}
      if(!$scope.store._id){
      		console.log('NEW') 
      		$http.post('/api/stores', $scope.store);
      }else {
      		$http.patch('/api/stores/'+$scope.store._id, $scope.store);
      		console.log('UPDATE');
      }
      $scope.store = null;
    };


$scope.uploadedFile = function(element) {
	console.log('elem '+element.files);
 $scope.$apply(function($scope) {

   $scope.files = element.files;         
 });
}

  })



.controller('AdminStoreCtrl', function ($scope , $http,socket,$stateParams) {
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
      socket.syncUpdates('product', $scope.products	);
      //socket.syncUpdates('store', $scope.stores);
    });




  $scope.saveStore = function() {
      console.log('store '+$scope.store);
      if (!$scope.store){return ;}
      if($scope.store.name === '') {return;}
      if(!$scope.store._id){
          console.log('NEW') 
          $http.post('/api/stores', $scope.store);
      }else {
          $http.patch('/api/stores/'+$scope.store._id, $scope.store);
          console.log('UPDATE');
      }
      //$scope.store = null;
    };    


    $scope.selectProduct = function(pr) {
    	console.log( ' select '+pr);
      $scope.product = pr;
    };

    $scope.showNewProduct = function(ok) {
      $scope.product = {};
    };

	$scope.deleteProduct = function() {
      console.log('DEL Product '+$scope.product);
      $http.delete('/api/products/'+$scope.product._id);
  	}

	$scope.cancelProduct = function() {
      $scope.product = null;
      
  	}

	$scope.saveProduct = function() {
      console.log('Product '+$scope.product);
      if (!$scope.product){return ;}
      if($scope.product.name === '') {return;}
      if(!$scope.product._id){
      		console.log('NEW') 
      		$http.post('/api/products', $scope.product);
      }else {
      		$http.patch('/api/products/'+$scope.product._id, $scope.product);
      		console.log('UPDATE');
      }
      $scope.product = null;
    };


  })

  ;
