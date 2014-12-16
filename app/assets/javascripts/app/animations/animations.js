(function() {
  'use strict';

  angular
    .module('council.animations')
    .factory('Animations', Animations);

  function Animations($q) {
    return {
      addClass: function(el, className) {
        return $q(function(resolve, reject) {
          el.addClass(className);

          el.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            resolve();
          });
        });
      }
    };
  }
})();
