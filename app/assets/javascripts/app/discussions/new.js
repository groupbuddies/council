(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('NewDiscussionCtrl', newDiscussionCtrl);

  function newDiscussionCtrl(Discussion, $state) {
    var ctrl = this;

    ctrl.createDiscussion = createDiscussion;

    $state.transitionTo('discussions.new.step1');

    function createDiscussion(discussion) {
      Discussion.create(discussion).then(onDiscussionSave);
    }

    function onDiscussionSave(discussion) {
      $state.go('discussions.show', { id: discussion.id });
    }
  }
})();
