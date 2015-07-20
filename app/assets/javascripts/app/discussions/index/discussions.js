(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl);

  function DiscussionsCtrl($state, Discussion, Notification, Me) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.showSidebar = false;
    ctrl.toggleSidebar = toggleSidebar;
    ctrl.notifications = function() {
      return Notification.getAll().length;
    };
    ctrl.userId = null;

    Me.find()
      .then(setUserId);

    Notification.findAll();

    Discussion
      .findAll()
      .then(resetDiscussions);

    function setUserId() {
      ctrl.userId = Me.get().id;
    }

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
