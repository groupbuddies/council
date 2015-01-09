(function() {
  'use strict';

  angular
    .module('council.core', [])
    .config(setupRoutes);

  function setupRoutes($locationProvider) {
    $locationProvider.html5Mode(true);
  };
})();
