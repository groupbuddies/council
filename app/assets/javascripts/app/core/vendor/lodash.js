(function() {
  'use strict';

  angular
    .module('council')
    .factory('_', lodash);

  function lodash() {
    return window._;
  }
})();
