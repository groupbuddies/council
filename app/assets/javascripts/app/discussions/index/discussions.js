(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl);

  function DiscussionsCtrl($state, Discussion, Notification, User) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.showSidebar = false;
    ctrl.toggleSidebar = toggleSidebar;
    ctrl.notifications = function() {
      return Notification.getAll().length;
    };

    User.findAll();
    Notification.findAll();

    Discussion
      .findAll()
      .then(resetDiscussions);

    function setNotifications(notifications) {
      ctrl.notifications = notifications.length;
    }

    function resetDiscussions(discussions) {
      ctrl.discussions = discussions;
      ctrl.pageReady = true;
    }

    function toggleSidebar() {
      ctrl.showSidebar = !ctrl.showSidebar;
    }
  }
})();
