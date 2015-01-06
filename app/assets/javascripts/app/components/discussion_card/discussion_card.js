(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('discussionCard', discussionCard)
    .controller('DiscussionCardCtrl', DiscussionCardCtrl);

  function discussionCard() {
    return {
      restrict: 'E',
      scope: {
        discussion: '='
      },
      replace: true,
      templateUrl: 'components/discussion_card/templates/discussion_card.html',
      controller: 'DiscussionCardCtrl as ctrl'
    };
  }

  function DiscussionCardCtrl($state) {
    var ctrl = this;

    ctrl.show = show;

    function show(id) {
      $state.go('discussions.show', { id: id });
    }
  }
})();
