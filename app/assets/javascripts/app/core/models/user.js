(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('User', User);

  function User(DS, $http) {
    var User = DS.defineResource({
      name: 'user',
      endpoint: 'users'
    });

    return User;
  }
})();
