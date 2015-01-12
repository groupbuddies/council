(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(discussion) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.openEditForm = openEditForm;
    ctrl.toggleCommentForm = toggleCommentForm;

    setDiscussion();

    function setDiscussion() {
      ctrl.discussion = discussion;
      ctrl.discussion.markAsRead();
      ctrl.pageReady = true;

      discussion.loadComments();
    }

    function toogleDiscussionState(discussion) {
      discussion.open = !discussion.open;
      discussion.update();
    }

    function openEditForm(comment) {
      ctrl.comment = comment;
      ctrl.toggleCommentForm();
    }

    function toggleCommentForm() {
      ctrl.showNewComment = !ctrl.showNewComment;
    }
  }
})();
