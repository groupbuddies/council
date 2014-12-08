(function() {
  'use strict';

  angular
    .module('two_cents.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl)
    .controller('NewDiscussionCtrl', NewDiscussionCtrl);

  function DiscussionsCtrl(Discussion) {
    var ctrl = this;

    ctrl.resetDiscussions = resetDiscussions;

    Discussion.findAll().then(ctrl.resetDiscussions);

    function resetDiscussions(discussions) {
      ctrl.discussions = discussions;
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
})();
