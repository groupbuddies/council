(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('User', User);

  function User(DS, $http) {
    var User = DS.defineResource({
      name: 'user',
      endpoint: 'users',
      methods: {
        update: function(params) {
          return DS.update('user', this.id, {
            user: params
          });
        }
      }
    });

    return User;
  }
})();
