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
        updatePassword: function(password, passwordConfirmation) {
          return DS.update('user', this.id, {
            user: {
              password: password,
              password_confirmation: passwordConfirmation
            }
          });
        }
      }
    });

    return User;
  }
})();
