(function() {
  'use strict';

  angular
    .module('council.users')
    .controller('EditUserCtrl', EditUserController);

  function EditUserController($state, User, userId) {
    var ctrl = this;
    ctrl.message = '';
    ctrl.data = {};
    ctrl.userUpdated = userUpdated;
    ctrl.userNotUpdated = userNotUpdated;

    User.find(userId).then(resetUser);

    function resetUser() {
      ctrl.user = User.get(userId);
      ctrl.data.username = ctrl.user.display_name;
      ctrl.data.color = ctrl.user.color;
    }

    function userUpdated() {
      $state.go('discussions.index');
    }

    function userNotUpdated() {
      ctrl.message = 'Failed to update';
    }
  }
})();
