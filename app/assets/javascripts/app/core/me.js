(function() {
  'use strict';

  angular
    .module('council.core')
    .service('Me', Me);

  function Me($http, $q) {
    var me = {};

    function find() {
      return $http.get('/me')
        .then(set);
    }

    function set(response) {
      me = response.data;
    }

    function get() {
      return me;
    }

    return {
      get: get,
      find: find
    }
  }
})();
