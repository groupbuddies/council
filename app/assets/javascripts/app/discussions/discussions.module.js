(function() {
  'use strict';

  angular
    .module('two_cents.discussions', [
      'two_cents.core'
    ])
    .config(setupRoutes);

  function setupRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/discussions');

    $stateProvider
      .state('discussions', {
        url: '/discussions',
        abstract: true,
        template: '<div ui-view></div>'
      })
      .state('discussions.index', {
        url: '',
        templateUrl: 'discussions/index.html'
      })
      .state('discussions.show', {
        url: '/:id',
        templateUrl: 'show.html'
      })
      .state('discussions.new', {
        url: '/new',
        templateUrl: 'new.html'
      })
      .state('discussions.edit', {
        url: '/:id/edit',
        templateUrl: 'edit.html'
      });
  }
})();
