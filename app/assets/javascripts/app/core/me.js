(function() {
  'use strict';

  angular
    .module('council.core')
    .service('Me', Me);

  function Me($http, $q) {
    var me;
    var mePromise;

    function find() {
      mePromise = $http.get('/me')
        .then(set);
      return mePromise;
    }

    function set(response) {
      me = response.data;
      return me;
    }

    function get() {
      if(me) {
        return $q.when(me);
      }
      else {
        return mePromise;
      }
    }

    return {
      get: get,
      find: find
    }
  }
})();
