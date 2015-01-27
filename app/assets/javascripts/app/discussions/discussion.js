(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Device, $location, $anchorScroll, discussion) {
    var ctrl = this;

    ctrl.isMobile = Device.isMobile();
    ctrl.pageReady = false;
    ctrl.openEditForm = openEditForm;
    ctrl.toggleCommentForm = toggleCommentForm;
    ctrl.toogleDiscussionState = toogleDiscussionState;

    setDiscussion();

    function setDiscussion() {
      ctrl.discussion = discussion;
      ctrl.discussion.markAsRead();
      ctrl.pageReady = true;

      discussion.loadComments();
    }

    function scrollTo(location) {
      $location.hash(location);
      $anchorScroll();
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
      if(Device.isMobile()) {
        ctrl.showNewComment = !ctrl.showNewComment;
      } else {
        scrollTo('newComment');
      }
    }
  }
})();
