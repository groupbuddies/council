(function() {
  'use strict';

  angular
    .module('error_tracking', [])
    .run(errorTracking);

  function errorTracking($window, $http) {
    var trackError = function(msg, filename, lineNum, colNum, error) {
      if (!error) {
        return;
      }

      $http.post('/appsignal_error_catcher', {
        message: error.message,
        name: error.name,
        backtrace: error.stack.split("\n"),
        path: $window.location.pathname,
        environment: {
          agent: navigator.userAgent,
          platform: navigator.platform,
          vendor: navigator.vendor,
          screen: {
            width: screen.width,
            height: screen.height
          }
        }
      });
    }
    $window.onerror = trackError;
  }
})();
