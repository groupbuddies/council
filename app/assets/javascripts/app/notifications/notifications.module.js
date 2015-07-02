(function() {
  'use strict';

  angular
    .module('council.notifications', [
      'council.core',
      'ngAnimate'
    ])
    .config(setupRoutes);

  function setupRoutes($stateProvider) {
    $stateProvider
      .state('notifications', {
        url: '/notifications',
        abstract: true,
        template: '<div ui-view class="u-fullSize"></div>'
      })
      .state('notifications.index', {
        url: '',
        templateUrl: 'notifications/index.html',
        controller: 'NotificationsCtrl as ctrl'
      });
  }
})();
