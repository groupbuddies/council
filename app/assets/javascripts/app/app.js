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
      'council.users',
      'btford.markdown',
      'dbaq.emoji'
    ])
    .config(csrf)
    .config(theme);

    function csrf($httpProvider) {
      $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
    }

    function theme($mdThemingProvider) {
      $mdThemingProvider.theme('council')
        .primaryColor('blue-grey', {
          'hue-1': 'A700'
        })
        .accentColor('amber')
        .warnColor('teal');
    }
})();
