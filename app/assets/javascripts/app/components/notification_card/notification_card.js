(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('notificationCard', notificationCard)
    .controller('NotificationCardCtrl', NotificationCardCtrl);

  function notificationCard() {
    return {
      restrict: 'E',
      scope: {
        notification: '='
      },
      replace: true,
      templateUrl: 'components/notification_card/templates/notification_card.html',
      controller: 'NotificationCardCtrl',
      controllerAs: 'ctrl',
      bindToController: true
    };
  }

  function NotificationCardCtrl($state, Notification) {
    var ctrl = this;
  }
})();
