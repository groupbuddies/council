(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Discussion, User, discussionId, _, DS) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.newComment = { discussionId: discussionId };
    ctrl.resetDiscussion = resetDiscussion;
    ctrl.addComment = addComment;

    Discussion.find(discussionId, { bypassCache: true }).then(ctrl.resetDiscussion);

    function resetDiscussion(discussion) {
      ctrl.discussion = discussion;
      _.each(ctrl.discussion.comments, addDiscussionData);
      ctrl.pageReady = true;

      function addDiscussionData(comment) {
        comment.discussionId = discussion.id;

        User.find(comment.author_id).then(function(user) {
          comment.author = user;
        });
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
