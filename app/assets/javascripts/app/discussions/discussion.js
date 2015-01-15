(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Discussion, User, discussionId, _, DS) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.toggleNewComment = toggleNewComment;
    ctrl.toogleDiscussionState = toogleDiscussionState;

    ctrl.newComment = {
      discussionId: discussionId
    };

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
      User.find(ctrl.discussion.author_id).then(function(user) {
        ctrl.discussion.author = user;
      });
      _.each(ctrl.discussion.comments, addDiscussionData);
      ctrl.discussion.markAsRead();
      ctrl.pageReady = true;

      function addDiscussionData(comment) {
        comment.discussionId = discussion.id;

        User.find(comment.author_id).then(function(user) {
          comment.author = user;
        });
      }
    }

    function toggleNewComment() {
      ctrl.showNewComment = !ctrl.showNewComment;
    }
  }
})();
