(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('councilFaButton', councilFaButton)
    .directive('councilRaisedButton', councilRaisedButton)
    .directive('councilFlatButton', councilFlatButton);

  function councilFaButton() {
    return {
      restrict: 'E',
      scope: {},
      link: councilFaButtonPostLink,
      templateUrl: 'components/button/templates/floating_action.html'
    };
  }

  function councilFaButtonPostLink(scope, element, attrs) {
    if (!attrs.type) { attrs.type = 'primary' };
    if (!attrs.icon) { attrs.icon = 'add' };
    scope.type = attrs.type;
    scope.icon = attrs.icon;
    scope.ariaLabel = attrs.ariaLabel;
  }

  function councilRaisedButton() {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      link: councilRaisedButtonPostLink,
      templateUrl: 'components/button/templates/raised.html'
    };
  }

  function councilRaisedButtonPostLink(scope, element, attrs) {
    if (!attrs.type) { attrs.type = 'secondary' };
    scope.type = attrs.type;
  }

  function councilFlatButton() {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      templateUrl: 'components/button/templates/flat.html'
    };
  }
})();
