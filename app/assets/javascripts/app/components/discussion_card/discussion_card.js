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
      controller: 'DiscussionCardCtrl as ctrl',
      bindToController: true
    };
  }

  function DiscussionCardCtrl($state, User) {
    var ctrl = this;

    ctrl.show = show;
    ctrl.commenters = commenters();
    ctrl.author = author();

    function show(id) {
      $state.go('discussions.show', { id: id });
    }

    function commenters() {
      var commenterIds = ctrl.discussion.commenter_ids;
      return User.getAllById(commenterIds);
    }

    function author() {
      return User.get(ctrl.discussion.author_id);
    }
  }
})();
