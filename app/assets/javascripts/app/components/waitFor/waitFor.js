(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('waitFor', waitFor);

  function waitFor($compile) {
    return {
      restrict: 'A',
      transclude: true,
      scope: {
        pageReady: '&waitFor'
      },
      templateUrl: 'components/waitFor/templates/wait_for.html',
      bindToController: true
    };
  }
})();
