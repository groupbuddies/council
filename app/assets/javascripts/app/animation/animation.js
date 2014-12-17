(function() {
  'use strict';

  angular
    .module('council.animations')
    .factory('Animation', Animation);

  function Animation($q) {
    return {
      addClass: function(el, className) {
        return $q(function(resolve) {
          el.addClass(className);

          el.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            resolve();
          });
        });
      }
    };
  }
})();
