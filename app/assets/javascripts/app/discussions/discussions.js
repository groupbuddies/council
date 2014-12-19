(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl);

  function DiscussionsCtrl($state, Discussion) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.showDiscussion = showDiscussion;

    Discussion.findAll().then(resetDiscussions);

    function resetDiscussions(discussions) {
      ctrl.discussions = discussions;
      ctrl.pageReady = true;
    }

    function showDiscussion(discussionId) {
      $state.go('discussions.show', { id: discussionId });
    }
  }
})();
