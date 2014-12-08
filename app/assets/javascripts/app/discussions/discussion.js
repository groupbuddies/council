(function() {
  'use strict';

  angular
    .module('two_cents.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Discussion, discussionId) {
    var ctrl = this;

    ctrl.newComment = { discussionId: discussionId };
    ctrl.resetDiscussion = resetDiscussion;
    ctrl.addComment = addComment;

    Discussion.find(discussionId, { bypassCache: true }).then(ctrl.resetDiscussion);

    function resetDiscussion(discussion) {
      ctrl.discussion = discussion;
    }

    function addComment(comment) {
      ctrl.discussion.addComment(comment).then(addToComments);

      function addToComments(comment) {
        ctrl.discussion.comments.push(comment);
      }
    }
  }
})();
