(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('page', page)
    .controller('PageCtrl', PageCtrl);
  
  function page() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        style: '@?', // supported values: 'white'
        padding: '@?'
      },
      templateUrl: 'components/page/templates/page.html',
      controller: 'PageCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  function PageCtrl() {
  }
})();
