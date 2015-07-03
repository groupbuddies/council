(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('notificationCard', notificationCard);

  function notificationCard() {
    return {
      restrict: 'E',
      scope: {
        notification: '='
      },
      replace: true,
      templateUrl: 'components/notification_card/templates/notification_card.html',
      controller: function() { },
      controllerAs: 'ctrl',
      bindToController: true
    };
  }
})();
