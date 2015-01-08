(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('EditDiscussionCtrl', EditDiscussionCtrl);

  function EditDiscussionCtrl(Discussion, $state, discussionId) {
    var ctrl = this;

    ctrl.populate = populate;
    ctrl.updateDiscussion = updateDiscussion;

    Discussion.find(discussionId, {
      bypassCache: true
    }).then(ctrl.populate);

    $state.transitionTo('discussions.edit.step1', {
      id: discussionId
    });

    function populate(discussion) {
      ctrl.discussion = discussion;
    }

    function updateDiscussion(discussion) {
      Discussion.create(discussion).then(onDiscussionSave);
    }

    function onDiscussionSave(discussion) {
      $state.go('discussions.show', { id: discussion.id });
    }
  }
})();
