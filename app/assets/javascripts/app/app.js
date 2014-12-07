(function() {
  'use strict';

  angular
    .module('two_cents', [
      'ngMaterial',
      'templates',
      'ui-router',
      'angular-data',

      'two_cents.core',
      'two_cents.discussions',
      'two_cents.comments'
    ]);
})();
