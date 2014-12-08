(function() {
  'use strict';

  angular
    .module('two_cents.components')
    .directive('multiline', multiline);

  function multiline($timeout) {
    return {
      restrict: 'A',
      compile: function(wrappedElement) {
        var element = wrappedElement[0],
            input = element.querySelector('input');

        element.innerHTML += '<textarea ng-model="value" class="ng-touched"></textarea>';

        $timeout(function() {
          element.querySelector('input').style.display = 'none';

          element.querySelector('textarea').addEventListener('blur', function() {
            element.classList.remove('md-input-focused');
          });

          element.querySelector('textarea').addEventListener('focus', function() {
            element.classList.add('md-input-focused');
          });
        }, 0)
      }
    }
  }
})();
