(function() {
  'use strict';

  angular
    .module('two_cents.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl)
    .controller('NewDiscussionCtrl', NewDiscussionCtrl);

  function DiscussionsCtrl($state, Discussion) {
    var ctrl = this;

    ctrl.resetDiscussions = resetDiscussions;
    ctrl.showDiscussion = showDiscussion;

    Discussion.findAll().then(ctrl.resetDiscussions);

    function resetDiscussions(discussions) {
      ctrl.discussions = discussions;
    }

    function showDiscussion(discussionId) {
      $state.go('discussions.show', { id: discussionId });
    }
  }

  function NewDiscussionCtrl(Discussion) {
    var ctrl = this;

    ctrl.createDiscussion = createDiscussion;

    function createDiscussion(discussion) {
      Discussion.create(discussion)
        .then(function (disc) {
          console.log(disc);
        })
        .then(null, function (err) {
          err;
        })
    }
  }

  function NewDiscussionCtrl(Discussion, $state) {
    var ctrl = this;

    ctrl.createDiscussion = createDiscussion;

    function createDiscussion(discussion) {
      Discussion.create(discussion)
        .then(function (disc) {
          $state.go('discussions.show', {id: disc.id})
        })
    }
  }
})();
