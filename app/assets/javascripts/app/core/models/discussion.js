(function() {
  'use strict';

  angular
    .module('two_cents.core')
    .factory('Discussion', Discussion);

  function Discussion(DS) {
    return DS.defineResource({
        name: 'discussion',
        endpoint: 'discussions'
      });
  }
})();
