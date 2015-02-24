(function() {
  'use strict';

  angular
    .module('council.components')
    .controller('CommentFormCtrl', CommentFormCtrl);

  function CommentFormCtrl(Comment, Keyboard, $scope) {
    var ctrl = this;

    ctrl.update = update;
    ctrl.create = create;
    ctrl.disabled = false;

    ctrl.comment = Comment.createInstance();

    $scope.$on('comment:open', function() {
      $('.Editor').focus();
    });

    $scope.$on('comment:close', function() {
      Keyboard.close();
    });

    function reset() {
      ctrl.disabled = false;
      ctrl.comment = Comment.createInstance();
      if (ctrl.toggle)
        ctrl.toggle();
    }

    function error() {
      ctrl.disabled = false;
    }

    function create() {
      ctrl.disabled = true;
      ctrl.discussion
        .addComment(ctrl.comment)
        .then(reset)
        .catch(error);
    }

    function update() {
      ctrl.disabled = true;
      ctrl.comment
        .DSSave()
        .then(reset)
        .catch(error);
    }
  }
})();
