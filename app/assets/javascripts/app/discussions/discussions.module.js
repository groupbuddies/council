(function() {
  'use strict';

  angular
    .module('council.discussions', [
      'council.core'
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
        templateUrl: 'discussions/index.html',
        controller: 'DiscussionsCtrl as ctrl'
      })
      .state('discussions.new', {
        url: '/new',
        templateUrl: 'discussions/new.html',
        controller: 'NewDiscussionCtrl as ctrl'
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
        templateUrl: 'discussions/edit.html'
      });
  }
})();
