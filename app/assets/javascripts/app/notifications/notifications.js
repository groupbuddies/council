(function() {
  'user strict';

  angular
    .module('council.notifications')
    .controller('NotificationsCtrl', NotificationsCtrl);

  function NotificationsCtrl($state, Notification) {
    var ctrl = this;

    Notification.findAll()
      .then(setNotifications);

    function setNotifications() {
      ctrl.notifications = Notification.getAll();
    }
  }
})();
