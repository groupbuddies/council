(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl($slidingCommentForm, Device, $location, $anchorScroll, discussion, $rootScope) {
    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.isMobile = Device.isMobile();
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

    function toggleCommentForm() {
      if (Device.isMobile())
        $slidingCommentForm.open(ctrl.discussion);
      else
        scrollTo('newComment');
    }
  }
})();
