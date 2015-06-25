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

    User.findAllById = function(ids) {
      return DS.filter('user', {
        where: { id: { 'in': ids } }
      });
    }

    return User;
  }
})();
