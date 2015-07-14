(function() {
  'use strict';

  angular
    .module('council.users')
    .controller('EditUserCtrl', EditUserController);

  function EditUserController($state, User, userId) {
    var ctrl = this;
    ctrl.data = {};
    ctrl.userUpdated = userUpdated;

    User.find(userId).then(resetUser);

    function resetUser() {
      ctrl.user = User.get(userId);
      ctrl.data.username = ctrl.user.display_name;
      ctrl.data.color = ctrl.user.color;
    }

    function userUpdated() {
      $state.go('discussions.index');
    }
  }
})();
