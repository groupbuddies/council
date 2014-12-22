(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl);

  function DiscussionsCtrl($state, Discussion) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.showSidebar = false;
    ctrl.toggleSidebar = toggleSidebar;
    ctrl.showDiscussion = showDiscussion;

    Discussion.findAll().then(resetDiscussions);

    function resetDiscussions(discussions) {
      ctrl.discussions = discussions;
      ctrl.pageReady = true;
    }

    function showDiscussion(discussionId) {
      $state.go('discussions.show', { id: discussionId });
    }

    function toggleSidebar() {
      ctrl.showSidebar = !ctrl.showSidebar;
    }
  }
})();
