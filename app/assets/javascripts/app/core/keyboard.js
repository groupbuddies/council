(function() {
  'use strict';

  angular
    .module('council.core')
    .service('Keyboard', Keyboard);

  function Keyboard($document) {
    var input = $('<input type="text">');

    function gainFocus() {
      $($document[0].body).append(input);

      input.focus();
    }

    function loseFocus() {
      $(input).remove();
    }

    function close() {
      _.debounce(function() {
        gainFocus();
        loseFocus();
      }, 50);
    }

    return {
      close: close
    };
  }
})();
