(function() {
  'use strict';

  angular
  .module('council.components')
  .directive('onScroll', onScroll);

  function onScroll($$rAF, $mdUtil) {
    return {
      restrict: 'A',
      link: function($scope, element, attrs) {
        var scrollableElement = $(attrs.onScrollAnchor);
        var refreshCallbacks = [];

        if (attrs.scrollingClass) {
          refreshCallbacks.push(refreshScrolling(element, attrs.scrollingClass));
        }

        if (attrs.topClass) {
          refreshCallbacks.push(refreshTop(element, attrs.topClass));
        }

        refreshElement(); // run the first time
        setupAugmentedScrollEvents(scrollableElement);
        scrollableElement.on('$scroll', $$rAF.throttle(refreshElement));

        function refreshElement() {
          var offset = scrollableElement.scrollTop();

          refreshCallbacks.forEach(function(callback) {
            callback(offset);
          });
        }

      }
    }

    function refreshTop(element, className) {
      return function(offset) {
        if (offset === 0) {
          element.addClass(className);
        } else {
          element.removeClass(className);
        }
      }
    }

    function refreshScrolling(element, className) {
      return function(offset) {
        if (offset > 0) {
          element.addClass(className);
        } else {
          element.removeClass(className);
        }
      }
    }

    // this code was copied from angular material sticky directive
    function setupAugmentedScrollEvents(element) {
      var SCROLL_END_DELAY = 200;
      var isScrolling;
      var lastScrollTime;

      element.on('scroll touchmove', function() {
        if (!isScrolling) {
          isScrolling = true;
          $$rAF(loopScrollEvent);
          element.triggerHandler('$scrollstart');
        }
        element.triggerHandler('$scroll');
        lastScrollTime = +$mdUtil.now();
      });

      function loopScrollEvent() {
        if (+$mdUtil.now() - lastScrollTime > SCROLL_END_DELAY) {
          isScrolling = false;
          element.triggerHandler('$scrollend');
        } else {
          element.triggerHandler('$scroll');
          $$rAF(loopScrollEvent);
        }
      }
    }

  }
})();
