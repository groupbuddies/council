(function() {
  'use strict';

  angular
    .module('two_cents', [
      'ngMaterial',
      'templates',
      'ui.router',
      'angular-data.DS',
      'two_cents.core',
      'two_cents.components',
      'two_cents.discussions',
      'two_cents.comments'
    ])
    .config(csrf);

    function csrf($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
})();
