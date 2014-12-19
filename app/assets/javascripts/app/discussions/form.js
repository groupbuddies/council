(function() {
  'use strict';

  angular
    .module('council.discussions')
    .directive('discussionForm', DiscussionForm)
    .controller('DiscussionFormCtrl', DiscussionFormCtrl);

  function DiscussionForm() {
    return {
      scope: {
        discussion: '=discussionForm'
      },
      templateUrl: 'discussions/templates/form.html',
      controller: 'DiscussionFormCtrl as ctrl',
      bindToController: true,
      compile: function(el, attrs) {
        if (!attrs.discussionForm) attrs.discussionForm = '{}';
      }
    };
  }

  function DiscussionFormCtrl(Discussion, $state) {
    var ctrl = this;

    ctrl.createDiscussion = createDiscussion;
    ctrl.updateDiscussion = updateDiscussion;

    function createDiscussion(discussion) {
      Discussion.create(discussion).then(onDiscussionSave);
    }

    function updateDiscussion(discussion) {
      discussion.update().then(onDiscussionSave);
    }

    function onDiscussionSave(discussion) {
      $state.go('discussions.show', { id: discussion.id });
    }
  }
})();
