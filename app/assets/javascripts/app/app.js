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
      'error_tracking',
      'btford.markdown',
      'dbaq.emoji'
    ])
    .config(csrf)
    .config(theme)
    .run(preventOverscroll);

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

  function preventOverscroll($document) {
    $document.find('body').on('touchmove', function(e) {
      if (!$('.TopBarLayout-content').has($(e.target)).length)
        e.preventDefault();
    });
  }
})();
