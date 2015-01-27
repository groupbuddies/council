(function() {
  'use strict';

  angular
    .module('council.discussions')
    .controller('DiscussionFormCtrl', DiscussionFormCtrl);

  function DiscussionFormCtrl($state, $mdToast,Device, Discussion, discussion) {
    var ctrl = this;

    ctrl.submited = false;
    ctrl.nextScreen = nextScreen;
    ctrl.discussion = discussion;
    ctrl.saveDiscussion = saveDiscussion;

    if(Device.isMobile()) {
      $state.go($state.current.name + '.step1');
    } else {
      $state.go($state.current.name + '.desktop');
    }

    function nextScreen(state) {
      if (ctrl.form.$valid)
        $state.go(state);
      else
        showToast('Please fill the required fields');
    }

    function showToast(message) {
      $mdToast.show(
        $mdToast.simple()
        .content(message)
        .position('bottom right')
        .hideDelay(2000)
      );
    }

    function saveDiscussion(discussion) {
      ctrl.submited = true;
      Discussion.create(discussion).then(onDiscussionSave);
    }

    function onDiscussionSave(discussion) {
      ctrl.submited = false;
      $state.go('discussions.show', { id: discussion.id });
    }
  }
})();
