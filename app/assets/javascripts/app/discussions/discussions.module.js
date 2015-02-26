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
            templateUrl: 'discussions/index/index.html'
          },
          'sidebar@discussions.index': {
            templateUrl: 'discussions/index/sidebar.html'
          }
        }
      })
      .state('discussions.show', {
        url: '/:id',
        templateUrl: 'discussions/show/show.html',
        controller: 'DiscussionCtrl as ctrl',
        resolve: {
          discussion: function($stateParams, Discussion) {
            return Discussion.find($stateParams.id, { bypassCache: true });
          }
        }
      })
      .state('discussions.new', {
        url: '/new',
        templateUrl: 'discussions/new/templates/discussion.html',
        controller: 'DiscussionFormCtrl as ctrl',
        resolve: {
          discussion: function(Discussion) {
            return Discussion.createInstance();
          }
        }
      })
      .state('discussions.new.desktop', {
        templateUrl: 'discussions/new/templates/desktop.html'
      })
      .state('discussions.new.step1', {
        templateUrl: 'discussions/new/templates/mobile_step1.html'
      })
      .state('discussions.new.step2', {
        templateUrl: 'discussions/new/templates/mobile_step2.html'
      })
      .state('discussions.edit', {
        url: '/:id/edit',
        templateUrl: 'discussions/new/templates/discussion.html',
        controller: 'DiscussionFormCtrl as ctrl',
        resolve: {
          discussion: function($stateParams, Discussion) {
            return Discussion.find($stateParams.id, { bypassCache: true });
          }
        }
      })
      .state('discussions.edit.desktop', {
        templateUrl: 'discussions/new/templates/desktop_edit.html'
      })
      .state('discussions.edit.step1', {
        templateUrl: 'discussions/new/templates/mobile_edit_step1.html'
      })
      .state('discussions.edit.step2', {
        templateUrl: 'discussions/new/templates/mobile_edit_step2.html'
      });
  }
})();
