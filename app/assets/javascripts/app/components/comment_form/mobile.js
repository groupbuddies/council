(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentFormMobile', commentFormMobile);

  function commentFormMobile() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        toggle: "&toggle",
        comment: "=comment",
        discussion: "=discussion"
      },
      controller: 'CommentFormCtrl',
      controllerAs: 'ctrl',
      templateUrl: 'components/comment_form/templates/mobile.html',
      bindToController: true
    };
  }
})();
