(function() {
  'use strict';

  angular
    .module('council.users')
    .controller('EditUserCtrl', EditUserController);

  function EditUserController($state, User, userId) {
    var ctrl = this;

    User.find(userId).then(resetUser);

    ctrl.updateUser = updateUser;
    ctrl.message = '';
    cleanPasswordFields();

    function updateUser() {
      if (ctrl.password !== ctrl.passwordConfirmation)
        return;

      ctrl.user.update({
        username: ctrl.username,
        color: ctrl.color,
        password: ctrl.password,
        password_confirmation: ctrl.passwordConfirmation
      }).then(userUpdated, userNotUpdated);

      cleanPasswordFields();
    }

    function resetUser(user) {
      ctrl.user = user;
      ctrl.username = user.display_name;
      ctrl.color = user.color;
    }

    function userUpdated() {
      $state.go('discussions.index');
    }

    function userNotUpdated() {
      ctrl.message = 'Failed to update';
    }

    function cleanPasswordFields() {
      ctrl.password = '';
      ctrl.passwordConfirmation = '';
    }
  }
})();
