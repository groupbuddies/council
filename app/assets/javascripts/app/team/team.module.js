(function() {
  'use strict';

  angular
    .module('council.team', [
        'council.core'
    ])
    .config(setupRoutes);

  function setupRoutes($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/team');

    $stateProvider
      .state('team', {
        url: '/team',
        templateUrl: 'team/index.html',
        controller: 'TeamCtrl as ctrl',
      });
  }

})();
