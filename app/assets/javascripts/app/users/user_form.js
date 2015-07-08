(function() {
  'use strict';

  angular
    .module('council.users')
    .controller('UserFormCtrl', UserFormCtrl);

  function UserFormCtrl() {
    var form = this;
    form.submit = submit;

    function submit(user, isValid, data,
        onSuccess, onFailure) {
      console.log('inside form ctrl');
      if(!isValid || !isValidPassword(data)) {
        return;
      }

      user.update(data)
        .then(onSuccess, onFailure);

      cleanPasswordFields(data);
    }

    function isValidPassword(data) {
      return data.password === data.password_confirmation;
    }

    function cleanPasswordFields(data) {
      data.password = '';
      data.password_confirmation = '';
    }
  }
})();
