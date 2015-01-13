(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Discussion, discussionId, _) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.toggleNewComment = toggleNewComment;
    ctrl.toogleDiscussionState = toogleDiscussionState;

    Discussion
      .find(discussionId)
      .then(updateDiscussion);

    function toogleDiscussionState(discussion) {
      discussion.open = !discussion.open;
      discussion.update();
    }

    function updateDiscussion(discussion) {
      resetController(discussion);

      discussion
        .refresh()
        .then(resetController);
    }

    function resetController(discussion) {
      ctrl.discussion = discussion;
      ctrl.discussion.markAsRead();
      ctrl.pageReady = true;
    }

    function toggleNewComment() {
      ctrl.showNewComment = !ctrl.showNewComment;
    }
  }
})();
