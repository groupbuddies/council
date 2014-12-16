(function() {
  'use strict';

  angular
    .module('council.members')
    .controller('MembersCtrl', MembersCtrl);

  function MembersCtrl($http) {
    var ctrl = this;

    $http.get('/members')
      .success(function(data) {
        ctrl.members = data;
      })
  }
})();
