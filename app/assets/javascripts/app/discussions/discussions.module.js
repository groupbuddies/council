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
        templateUrl: 'discussions/templates/discussion.html',
        controller: 'NewDiscussionCtrl as ctrl'
      })
      .state('discussions.new.step1', {
        views: {
          'header@discussions.new': {
            templateUrl: 'discussions/templates/header_step1.html'
          },
          'form@discussions.new': {
            templateUrl: 'discussions/templates/step1.html'
          }
        }
      })
      .state('discussions.new.step2', {
        views: {
          'header@discussions.new': {
            templateUrl: 'discussions/templates/header_step2.html'
          },
          'form@discussions.new': {
            templateUrl: 'discussions/templates/step2.html'
          }
        }
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
        templateUrl: 'discussions/templates/discussion.html',
        controller: 'EditDiscussionCtrl as ctrl',
        resolve: {
          discussionId: function($stateParams) {
            return $stateParams.id;
          }
        }
      })
      .state('discussions.edit.step1', {
        views: {
          'header@discussions.edit': {
            templateUrl: 'discussions/templates/edit_header_step1.html'
          },
          'form@discussions.edit': {
            templateUrl: 'discussions/templates/step1.html'
          }
        }
      })
      .state('discussions.edit.step2', {
        views: {
          'header@discussions.edit': {
            templateUrl: 'discussions/templates/edit_header_step2.html'
          },
          'form@discussions.edit': {
            templateUrl: 'discussions/templates/step2.html'
          }
        }
      });
  }
})();
