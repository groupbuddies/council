(function() {
  'use strict';

  angular
    .module('two_cents', [
      'ngMaterial',
      'templates',
      'ui.router',
      'angular-data.DS',
      'two_cents.core',
      'two_cents.discussions',
      'two_cents.comments'
    ]);
})();
