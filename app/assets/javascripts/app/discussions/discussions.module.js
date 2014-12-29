(function() {
  'use strict';

  angular
    .module('council.discussions', [
      'council.core',
      'ngAnimate'
    ])
    .config(setupRoutes);

  function setupRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/discussions');

    $stateProvider
      .state('discussions', {
        url: '/discussions',
        abstract: true,
        template: '<div ui-view class="u-fullSize"></div>'
      })
      .state('discussions.index', {
        url: '',
        views: {
          '': {
            controller: 'DiscussionsCtrl as ctrl',
            templateUrl: 'discussions/index.html'
          },
          'sidebar@discussions.index': {
            templateUrl: 'discussions/sidebar.html'
          }
        }
      })
      .state('discussions.new', {
        url: '/new',
        templateUrl: 'discussions/new.html'
      })
      .state('discussions.show', {
        url: '/:id',
        templateUrl: 'discussions/show.html',
        controller: 'DiscussionCtrl as ctrl',
        resolve: {
          discussionId: function($stateParams) {
            return $stateParams.id;
          }
        }
      })
      .state('discussions.edit', {
        url: '/:id/edit',
        templateUrl: 'discussions/edit.html',
        controller: 'DiscussionCtrl as ctrl',
        resolve: {
          discussionId: function($stateParams) {
            return $stateParams.id;
          }
        }
      });
  }
})();
