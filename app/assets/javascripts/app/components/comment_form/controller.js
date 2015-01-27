(function() {
  'use strict';

  angular
    .module('council.components')
    .controller('CommentFormCtrl', CommentFormCtrl);

  function CommentFormCtrl(Comment, Keyboard, $scope) {
    var ctrl = this;

    ctrl.update = update;
    ctrl.create = create;

    ctrl.comment = Comment.createInstance();

    $scope.$on('comment:open', function() {
      $('.Editor').focus();
    });

    $scope.$on('comment:close', function() {
      Keyboard.close();
    });

    function reset() {
      ctrl.comment = Comment.createInstance();
      if (ctrl.toggle) {
        ctrl.toggle();
      }
    }

    function create() {
      ctrl.discussion
      .addComment(ctrl.comment)
      .then(reset);
    }

    function update() {
      ctrl.comment
      .DSSave()
      .then(reset);
    }
  }
})();
