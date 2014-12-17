(function() {
  'use strict';

  angular
    .module('council.users', [
      'council.core'
    ])
    .config(setupRoutes);

  function setupRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('users', {
        url: '/users',
        abstract: true,
        template: '<div ui-view class="u-fullSize"></div>'
      })
      .state('users.edit', {
        url: '/:id/edit',
        templateUrl: 'users/edit.html',
        controller: 'EditUserCtrl as ctrl',
        resolve: {
          userId: function($stateParams) {
            return $stateParams.id;
          }
        }
      });
  }
})();
