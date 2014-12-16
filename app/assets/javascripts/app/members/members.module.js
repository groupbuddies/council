(function() {
  'use strict';

  angular
    .module('council.members', [
        'council.core'
    ])
    .config(setupRoutes);

  function setupRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/members');

    $stateProvider
      .state('members', {
        url: '/members',
        templateUrl: 'members/index.html',
        controller: 'MembersCtrl as ctrl',
      });
  }

})();
