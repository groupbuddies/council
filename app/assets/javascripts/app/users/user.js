(function() {
  'use strict';

  angular
    .module('council.users')
    .controller('EditUserCtrl', EditUserController);

  function EditUserController(User, userId, DS) {
    var ctrl = this;

    User.find(userId).then(resetUser);

    ctrl.changePassword = changePassword;
    ctrl.message = '';
    cleanPasswordFields();

    function changePassword() {
      if (ctrl.password !== ctrl.passwordConfirmation) return;

      ctrl.user.updatePassword(ctrl.password, ctrl.passwordConfirmation)
        .then(passwordUpdated, passwordNotUpdated);

      cleanPasswordFields();
    }

    function resetUser(user) {
      ctrl.user = user;
    }

    function passwordUpdated() {
      ctrl.message = 'Password changed with success';
    }

    function passwordNotUpdated() {
      ctrl.message = 'Failed to update password';
    }

    function cleanPasswordFields() {
      ctrl.password = '';
      ctrl.passwordConfirmation = '';
    }
  }
})();
