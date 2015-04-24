(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('toolbar', toolbar)
    .directive('toolbarIcon', toolbarIcon);

  function toolbar() {
    return {
      restict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'components/toolbar/toolbar_tpl.html',
      scope: {
        shadow: '@', // send value 'enabled' to enable shadows
        style: '@' // supported values: 'alternative' and 'accent'
      }
    };
  }

  function toolbarIcon() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'components/toolbar/toolbar_icon_tpl.html',
      scope: {
        align: '@' // supported values: 'left'
      }
    };
  }
})();
