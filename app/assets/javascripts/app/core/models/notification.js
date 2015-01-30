(function() {
  'use strict';

  angular
    .module('council.core')
    .factory('Notification', Notification);

  function Notification(DS) {
    var Notification = DS.defineResource({
      name: 'notification',
      endpoint: 'notifications'
    });

    return Notification;
  }
})();
