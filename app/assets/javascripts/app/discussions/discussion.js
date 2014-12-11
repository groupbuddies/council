(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Discussion, discussionId, _, DS) {
    var ctrl = this;

    ctrl.newComment = { discussionId: discussionId };
    ctrl.resetDiscussion = resetDiscussion;
    ctrl.addComment = addComment;

    Discussion.find(discussionId, { bypassCache: true }).then(ctrl.resetDiscussion);

    function resetDiscussion(discussion) {
      ctrl.discussion = discussion;
      _.each(ctrl.discussion.comments, addDiscussionData);

      function addDiscussionData(comment) {
        comment.discussionId = discussion.id;
        comment.author = _(discussion.authors).findWhere({ id: comment.author_id });
      }
    }

    function addComment(comment) {
      ctrl.discussion.addComment(comment).then(addToComments);

      function addToComments(comment) {
        ctrl.discussion.comments.push(comment);
      }
    }
  }
})();
