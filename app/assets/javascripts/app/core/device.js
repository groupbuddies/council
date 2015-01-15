(function() {
  'use strict';

  angular
    .module('council.core')
    .service('Device', Device);

  function Device($window) {
    var mobileDetect = new MobileDetect($window.navigator.userAgent);

    function isMobile() {
      return !!mobileDetect.mobile();
    }

    return {
      isMobile: isMobile
    };
  }
})();
