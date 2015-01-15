(function() {
  'use strict';

  angular
    .module('council.components')
    .controller('CommentFormCtrl', CommentFormCtrl);

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
