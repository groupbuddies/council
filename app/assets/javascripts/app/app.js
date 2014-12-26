(function() {
  'use strict';

  angular
    .module('council', [
      'ngMaterial',
      'templates',
      'ui.router',
      'angular-data.DS',
      'angularMoment',
      'council.core',
      'council.components',
      'council.discussions',
      'council.comments',
      'council.members',
      'council.users',
      'btford.markdown'
    ])
    .config(csrf)
    .run(function ($rootScope) {
      $rootScope.$on('$stateChangeStart', function(event, toState) {
        console.log('[DEBUG] Route change: ', toState);
      })

      if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
          FastClick.attach(document.body);
        }, false);
      }
    });

    function csrf($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }
})();
