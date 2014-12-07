(function() {
  'use strict';

  angular
    .module('two_cents.discussions')
    .controller('DiscussionsCtrl', DiscussionsCtrl);

  function DiscussionsCtrl(Discussion) {
    var ctrl = this;

    ctrl.resetDiscussions = resetDiscussions;

    Discussion.findAll().then(ctrl.resetDiscussions);

    function resetDiscussions(discussions) {
      ctrl.discussions = discussions;
    }
  }
})();
