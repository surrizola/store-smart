'use strict';

angular.module('storeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
	    .state('store', {
        url: '/store/:storeId',
        templateUrl: 'app/main/store.html',
        controller: 'StoreCtrl'
      });
      ;
  });