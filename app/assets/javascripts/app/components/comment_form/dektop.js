(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentForm', commentForm);

  function commentForm() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        comment: "=comment",
        discussion: "=discussion"
      },
      controller: 'CommentFormCtrl',
      controllerAs: 'ctrl',
      templateUrl: 'components/comment_form/templates/desktop.html',
      bindToController: true
    };
  }
})();
