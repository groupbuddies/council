(function() {
  'use strict';

  angular
    .module('two_cents')
    .factory('_', lodash);

  function lodash() {
    return window._;
  }
})();
