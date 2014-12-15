(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl)
    .controller('NewDiscussionCtrl', NewDiscussionCtrl);

  function DiscussionsCtrl($state, Discussion) {

    var ctrl = this;

    ctrl.pageReady = false;
    ctrl.showDiscussion = showDiscussion;

    Discussion.findAll().then(resetDiscussions);

    function resetDiscussions(discussions) {
      ctrl.discussions = discussions;
      ctrl.pageReady = true;
    }

    function showDiscussion(discussionId) {
      $state.go('discussions.show', { id: discussionId });
    }
  }

  function NewDiscussionCtrl(Discussion, $state) {
    var ctrl = this;

    ctrl.createDiscussion = createDiscussion;

    function createDiscussion(discussion) {
      Discussion.create(discussion)
        .then(function (disc) {
          $state.go('discussions.show', {id: disc.id});
        });
    }
  }
})();
