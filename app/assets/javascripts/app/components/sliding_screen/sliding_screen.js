(function() {
  'use strict';

  angular
  .module('council.components')
  .directive('slidingScreen', slidingScreen);

  function slidingScreen($mdConstant) {
    function link($scope, element, attrs) {
      var makeVisible = show,
          makeInvisible = hideBottom;

      $(element).addClass('SlidingScreen');
      $scope.$watch(attrs.show, function(visible) {
        if (visible) {
          makeAnimated(element);
          makeVisible(element);
        } else {
          makeInvisible(element);
        }
      });
    }

    function makeAnimated(element) {
      element.css($mdConstant.CSS.TRANSITION, 'all 0.4s ease-in-out');
    }

    function show(element) {
      element.css($mdConstant.CSS.TRANSFORM, 'translate(0, 0)');
    }

    function hideBottom(element) {
      element.css($mdConstant.CSS.TRANSFORM, 'translate(0, 100%)');
    }

    return {
      restrict: 'E',
      link: link
    };
  }
})();
