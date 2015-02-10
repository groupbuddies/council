(function (){
  'use strict';

  angular
    .module('council.core')
    .service('Notifications', Notifications);

  function Notifications($window) {
    var closeTimeout = 5000;
    var hasUserPermission = false;
    var supportsNotifications = false;

    function initialize() {
      checkSupport();
      if (supportsNotifications) {
        $window.Notification.requestPermission(requestPermissions);
      }
    }

    function checkSupport() {
      if (('Notification' in $window)) {
        supportsNotifications = true;
      }
    }

    function requestPermissions(permission) {
      hasUserPermission = (permission === 'granted');
    }

    function send(title, options) {
      if (hasUserPermission && supportsNotifications) {
        var notification = new $window.Notification(title, options);
        notification.onshow = function() {
          $window.setTimeout(notification.close.bind(notification), closeTimeout);
        };
        return notification;
      }
    }

    $window.onload = initialize;

    return {
      send: send
    };
  }
})();
