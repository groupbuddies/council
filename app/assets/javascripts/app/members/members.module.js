(function() {
  'use strict';

  angular
    .module('council.members', [
        'council.core'
    ])
    .config(setupRoutes);

  function setupRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('members', {
        url: '/members',
        templateUrl: 'members/index.html',
        controller: 'MembersCtrl as ctrl',
      });
  }

})();
