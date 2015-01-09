(function() {
  'use strict';

  angular
    .module('council.core')
    .run(EasterEggs);

  function EasterEggs($document) {

    var makeGithub = function() {
      if (localStorage.getItem('githubify') === 'true') {
        $('body').css({
          'fontFamily': '"Helvetica Neue"',
          'fontSize': '16px',
          'lineHeight': '1.4'
        });
      } else {
        $('body').css({
          'fontFamily': '',
          'fontSize': '',
          'lineHeight': ''
        });
      }
    };

    new Konami(function() {
      var value = localStorage.getItem('githubify');

      if (value == 'true') {
        value = 'false';
      } else {
        value = 'true';
      }

      localStorage.setItem('githubify', value);

      makeGithub();
    });

    $document.ready(function() {
      makeGithub();
    });

  }
})();
