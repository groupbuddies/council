(function() {
  'use strict';

  angular
    .module('council.components')
    .directive('commentForm', commentForm)
    .controller('CommentFormCtrl', CommentFormCtrl);

  function commentForm() {
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
      templateUrl: 'components/comment_form/templates/comment_form.html',
      bindToController: true
    };
  }

  function CommentFormCtrl(Comment) {
    var ctrl = this;

    ctrl.update = update;
    ctrl.create = create;

    reset();

    function reset() {
      ctrl.comment = Comment.createInstance();
    }

    function create() {
      ctrl.discussion
      .addComment(ctrl.comment)
      .then(reset);
      ctrl.toggle();
    }

    function update() {
      ctrl.comment
      .DSSave()
      .then(reset);
      ctrl.toggle();
    }
  }
})();
