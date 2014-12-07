(function() {
  'use strict';

  angular
    .module('two_cents.discussions')
    .controller('DiscussionCtrl', DiscussionCtrl);

  function DiscussionCtrl(Discussion, discussionId) {
    var ctrl = this;

    ctrl.resetDiscussion = resetDiscussion;

    Discussion.find(discussionId).then(ctrl.resetDiscussion);

    function resetDiscussion(discussion) {
      ctrl.discussion = discussion;
    }
  }
})();
