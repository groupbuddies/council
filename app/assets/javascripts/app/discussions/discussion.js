(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Device, $location, $anchorScroll, discussion, $rootScope) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.isMobile = Device.isMobile();
    ctrl.openEditForm = openEditForm;
    ctrl.toggleCommentForm = toggleCommentForm;
    ctrl.toogleDiscussionState = toogleDiscussionState;

    setDiscussion();
    discussion.loadComments();
    discussion.deleteNotification();

    function setDiscussion() {
      ctrl.discussion = discussion;
      ctrl.pageReady = true;
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
      fireEvents();
    }

    function fireEvents() {
      if (ctrl.showNewComment === false) {
        $rootScope.$broadcast('comment:close');
      } else {
        $rootScope.$broadcast('comment:open');
      }
    }
  }
})();
