(function() {
  'use strict';

  angular
    .module('council.team')
    .controller('TeamCtrl', TeamCtrl);

  function TeamCtrl($http) {
    var ctrl = this;

    $http.get('/team')
      .success(function(data) {
        ctrl.team = data;
      })
  }
})();
