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

      ctrl.user.update({
        password: ctrl.password,
        password_confirmation: ctrl.passwordConfirmation,
        username: ctrl.username })
        .then(passwordUpdated, passwordNotUpdated);

      cleanPasswordFields();
    }

    function resetUser(user) {
      ctrl.user = user;
    }

    function passwordUpdated() {
      ctrl.message = 'User updated with success';
    }

    function passwordNotUpdated() {
      ctrl.message = 'Failed to update';
    }

    function cleanPasswordFields() {
      ctrl.password = '';
      ctrl.passwordConfirmation = '';
    }
  }
})();
