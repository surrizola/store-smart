'use strict';

angular.module('storeApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'home',
      'link': '/'
    },
    {
      'title': 'admin',
      'link': '/admin'
    }
    ];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });