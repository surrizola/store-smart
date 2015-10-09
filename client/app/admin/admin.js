'use strict';

angular.module('storeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminCtrl'
      })
      .state('admin-store', {
        url: '/adminStore/:storeId',
        templateUrl: 'app/admin/adminStore.html',
        controller: 'AdminStoreCtrl'
      });
  });