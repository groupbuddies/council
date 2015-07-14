(function() {
  'use strict';

  angular
    .module('council.users')
    .controller('UserFormCtrl', UserFormCtrl);

  function UserFormCtrl() {
    var form = this;
    form.message = '';
    form.submit = submit;

    function submit(user, isValid, data,
        onSuccess) {
      if(!isValid || !isValidPassword(data)) {
        return;
      }

      user.update(data)
        .then(onSuccess, userNotUpdated);

      cleanPasswordFields(data);
    }

    function isValidPassword(data) {
      return data.password === data.password_confirmation;
    }

    function userNotUpdated() {
      form.message = 'Failed to update';
    }

    function cleanPasswordFields(data) {
      data.password = '';
      data.password_confirmation = '';
    }
  }
})();
